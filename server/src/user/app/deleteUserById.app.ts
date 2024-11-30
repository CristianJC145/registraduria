import { DeleteRecordsByIdMySql } from '../../shared/infra/mysql/deleteRecordsById.mysql';
import { DeleteUserByIdService } from '../domain/services/deleteUserById.service';

export class DeleteUserByIdApp {
  async run(id: number) {
    try {
      const deteleUserById = new DeleteUserByIdService(new DeleteRecordsByIdMySql());
      await deteleUserById.run(id);
      return id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
