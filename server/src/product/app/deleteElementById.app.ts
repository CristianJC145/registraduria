import { DeleteRecordsByIdMySql } from '../../shared/infra/mysql/deleteRecordsById.mysql';
import { DeleteElementsByIdService } from '../domain/services/deleteElementById.service';

export class DeleteElementByIdApp {
  async run(id: number) {
    try {
      const deteleElementById = new DeleteElementsByIdService(new DeleteRecordsByIdMySql());
      await deteleElementById.run(id);
      return id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
