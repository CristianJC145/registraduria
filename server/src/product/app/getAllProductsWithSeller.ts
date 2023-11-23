import { GetAllProductsWithSellerService } from '../domain/services/getAllProductsWithSeller.service';
import { GetRecordsByFieldMySql } from '../../shared/infra/mysql/getRecordsByField.mysql';
import { GetAllRecordsMySql } from '../../shared/infra/mysql/getAllRecords.mysql';

export class GetAllProductsWithSellerApp {
  async run() {
    try {
      const getAllProducts = new GetAllProductsWithSellerService(new GetAllRecordsMySql(), new GetRecordsByFieldMySql());
      const products = await getAllProducts.run();
      const result = { products };
      if (products.products.length > 0) {
        products.products.forEach((product) => {
          // eslint-disable-next-line prefer-destructuring
          product.images = product.images.split(',');
        });
      }
      return result.products;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
