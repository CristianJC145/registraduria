import { GetAllRecordsRepository } from '../../domain/repositories/getAllRecords.repository';
import { getAllByTable } from './db.mysql';

export class GetAllRecordsMySql implements GetAllRecordsRepository {
  async run(table: string): Promise<any[]> {
    return getAllByTable(table);
  }
}
