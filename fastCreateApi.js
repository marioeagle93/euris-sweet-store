const { promisify } = require('util');
const fs = require('fs');
const http = require('http');
const child_process = require('child_process');
const exec = promisify(child_process.exec);
const stat = fs.promises.stat;
const rimraf = promisify(require('rimraf'));
const argv = require('yargs').alias('f', 'force').alias('o', 'override').nargs('o', 2).alias('v', 'verbose').argv;

const SWAGGER_DIR_PATH = './src/swagger';
const SWAGGER_CLI_JAR = 'swagger-codegen-cli-3.0.29.jar';
const API_DIR_PATH = './src/app/api';
const SERVICE_PATH = './src/app/api/api';
const MODEL_PATH = './src/app/api/model';

const OVERRIDES = (argv.override || []).reduce((rv, curr, currIndex, array) => {
  if (currIndex % 2 == 0) {
    rv[curr] = array[currIndex + 1];
  }
  return rv;
}, {});

async function listSwaggerFiles() {
  let files = await fs.promises.readdir(SWAGGER_DIR_PATH);
  return files.filter((file) => file.endsWith('-swagger.yaml'));
}

var downloadJson = async function () {
  return new Promise((resolve, reject) => {
    try {
      console.log('Start Download Json');
      const file = fs.createWriteStream(`${SWAGGER_DIR_PATH}/` + 'sweetstore-swagger.yaml');
      http.get('http://us-central1-test-b7665.cloudfunctions.net/api/docs/', function (response) {
        response.pipe(file);

        file.on('finish', () => {
          file.close();
          console.log('Download Completed');
          resolve(true);
        });
      });
    } catch (e) {
      reject(false);
    }
  });
};
/**
 *
 * @param {string} swaggerFile
 */
async function mayGenerateApi(swaggerFile) {
  let apiName = swaggerFile.slice(0, -'-swagger.yaml'.length);
  let apiFile = `${API_DIR_PATH}/${OVERRIDES[apiName] || apiName}/api/api.ts`;
  let statsFetched = false;
  try {
    let [swaggerStat, apiStat] = await Promise.all([stat(`${SWAGGER_DIR_PATH}/${swaggerFile}`), stat(apiFile)]);
    statsFetched = true;
    if (swaggerStat.mtime > apiStat.mtime) {
      await generateApi(swaggerFile, true);
    } else {
      console.log(`Skipping ${apiName}...`);
    }
  } catch (err) {
    if (err.code === 'ENOENT' && !statsFetched) {
      await generateApi(swaggerFile, true);
    } else {
      logError(apiName, err);
      throw err;
    }
  }
}

/**
 *
 * @param {string} swaggerFile
 * @param {boolean} deleteApi
 */
async function generateApi(swaggerFile, deleteApi) {
  let apiName = swaggerFile.slice(0, -'-swagger.yaml'.length);
  let apiPath = `${API_DIR_PATH}`; // ${OVERRIDES[apiName] || apiName}`;
  console.log(`(Re)generating API: ${apiName}...`);
  if (deleteApi) {
    // await deleteDirectory(apiPath);
    console.log('Elimino servizi');
    await deleteDirectory(SERVICE_PATH);
    console.log('Elimino model');
    await deleteDirectory(MODEL_PATH);
  }
  let command = `java -jar --add-opens=java.base/java.util=ALL-UNNAMED ${SWAGGER_DIR_PATH}/${SWAGGER_CLI_JAR} generate -i ${SWAGGER_DIR_PATH}/${swaggerFile} -l typescript-angular --additional-properties basePath=,ngVersion=13.2.4,providedInRoot=true -o ${apiPath}`;
  console.log(command);
  let output = await exec(command);
  if (argv.verbose) {
    // Swagger CLI writes its normal output to STDERR. Dunno why.
    console.log(`${output.stderr}`);
  } else {
    console.log(`...(Re)generating API done! (${apiName})`);

    console.log(`Start cleaning files`);

    try {
      await deleteDirectory(apiPath + '/.swagger-codegen');
    } catch (error) {}
    try {
      await deleteFile(apiPath + '/.gitignore');
    } catch (error) {}
    try {
      await deleteFile(apiPath + '/.npmignore');
    } catch (error) {}
    try {
      await deleteFile(apiPath + '/.swagger-codegen-ignore');
    } catch (error) {}
    try {
      await deleteFile(apiPath + '/git_push.sh');
    } catch (error) {}
    try {
      await deleteFile(apiPath + '/index.ts');
    } catch (error) {}
    try {
      await deleteFile(apiPath + '/ng-package.json');
    } catch (error) {}

    try {
      await deleteFile(apiPath + '/api/api.ts');
    } catch (error) {}

    try {
      await deleteFile(apiPath + '/model/models.ts');
    } catch (error) {}

    console.log(`...clean done! (${apiName})`);
  }
}

/**
 *
 * @param {string} path
 */
async function deleteDirectory(path) {
  await rimraf(path, {
    /**
     * Lately there are some serious problems of ENOEMPTY errors
     * And other EPERMs. Setting a bigger number of retries should solve
     * the issue.
     */
    maxBusyTries: 20
  });
}

/**
 *
 * @param {string} fileName
 */
async function deleteFile(fileName) {
  await fs.unlinkSync(fileName);
}

/**
 *
 * @param {string} apiName
 * @param {Error} error
 */
function logError(apiName, error) {
  if (error.stderr) {
    console.error(`Error for ${apiName} (${error.code}): ${error.message}
${error.stderr}`);
  } else {
    console.error(`Error for ${apiName} (${error.code}): ${error.message}`);
  }
}

(async function () {
  try {
    if (argv.force) {
      console.log('Clearing API folder...');
      await deleteDirectory(API_DIR_PATH);
    }

    let args = process.argv.slice(2);
    if (args != undefined && args == 'url') await downloadJson();

    let files = await listSwaggerFiles();
    try {
      await Promise.all(files.map(mayGenerateApi));
    } catch (err) {
      process.exitCode = 1;
    }
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
})();
