import { GetAllRecodsService } from '../../shared/domain/services/getAllRecords.service';
import { GetAllRecordsMySql } from '../../shared/infra/mysql/getAllRecords.mysql';

export class GetAllProductsApp {
  async run() {
    const getAllProductsService = new GetAllRecodsService(
      new GetAllRecordsMySql(),
    );
    const products = await getAllProductsService.run('products');

    if (products.length > 0) {
      products.forEach((product) => {
        // eslint-disable-next-line prefer-destructuring
        product.images = product.images.split(',');
      });
    }

    return products;
  }
}
