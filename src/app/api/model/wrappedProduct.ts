/**
 * Euris FE Test API Docs
 * API information required to complete the Euris frontend test, the base path is http://us-central1-test-b7665.cloudfunctions.net/api/ and remember that your store ID is ijpxNJLM732vm8AeajMR 
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface WrappedProduct {
    id: string;
    data: {
      title: string;
      category: string;
      price: number;
      employee: string;
      description?: string;
      reviews?: string[];
  }
}