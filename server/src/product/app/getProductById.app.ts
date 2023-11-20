import { GetProductSubcategoryByIdService } from '../domain/services/getProductById.service';
import { GetRecordsByFieldMySql } from '../../shared/infra/mysql/getRecordsByField.mysql';
import { GetRecordsByIdMySql } from '../../shared/infra/mysql/getRecordsById.mysql';

export class GetProductByIdApp {
  async run(id: number) {
    try {
      const getProductById = new GetProductSubcategoryByIdService(new GetRecordsByIdMySql(), new GetRecordsByFieldMySql());
      const productById = await getProductById.run('products', id);
      const result = { productById };
      return result.productById;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
