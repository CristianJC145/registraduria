import { DeleteRecordsByIdMySql } from '../../shared/infra/mysql/deleteRecordsById.mysql';
import { DeletePeopleByIdService } from '../domain/services/deletePeopleById.service';

export class DeletePeopleByIdApp {
  async run(id: number) {
    try {
      const detelePeopleById = new DeletePeopleByIdService(new DeleteRecordsByIdMySql());
      await detelePeopleById.run(id);
      return id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
