import { GetRecordsByFieldRepository } from '../../../shared/domain/repositories/getRecordsByField.repository';
import { GetAllRecordsRepository } from '../../../shared/domain/repositories/getAllRecords.repository';

export class GetAllProductsWithSellerService {
  constructor(
    private getProductById : GetAllRecordsRepository,
    private getSellerById : GetRecordsByFieldRepository,
  ) {}

  async run() {
    const products = await this.getProductById.run('products');
    if (products.length > 0) {
      const productsWithSeller = await Promise.all(products.map(async (product) => {
        const id = product.user_id;
        const seller = await this.getSellerById.run('name', 'users', 'id', id);

        return {
          ...product,
          seller: seller[0],
        };
      }));

      return { products: productsWithSeller };
    }
    return { products: [] };
  }
}
