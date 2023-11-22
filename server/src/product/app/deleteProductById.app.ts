import { DeleteProductByIdService } from '../domain/services/deleteProductById.service';
import { DeleteRecordsByIdMySql } from '../../shared/infra/mysql/deleteRecordsById.mysql';

export class DeleteProductByIdApp {
  async run(id: number) {
    try {
      const deteleProductById = new DeleteProductByIdService(new DeleteRecordsByIdMySql(), new DeleteRecordsByIdMySql());
      await deteleProductById.run(id);
      return id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
