import { DeleteRecordsByIdRepository } from '../../domain/repositories/deleteRecordsById.repository';
import { deleteRecord } from './db.mysql';

export class DeleteRecordsByIdMySql implements DeleteRecordsByIdRepository {
  async run(table: string, field: string, id: number): Promise<any[]> {
    return deleteRecord(table, field, id);
  }
}
