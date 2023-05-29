module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    '@typescript-eslint/no-inferrable-types': 'off',
    'no-console': 'warn',
    'no-case-declarations': 'off',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'prettier/prettier': ['error', { usePrettierrc: true, endOfLine: 'auto' }] // Use our .prettierrc file as source
  }
};
