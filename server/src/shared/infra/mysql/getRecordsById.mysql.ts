import { GetRecordsByIdRepository } from '../../domain/repositories/getRecordsById.repository';
import { getByIdTable } from './db.mysql';

export class GetRecordsByIdMySql implements GetRecordsByIdRepository {
  async run(table: string, id: number): Promise<any[]> {
    return getByIdTable(table, id);
  }
}
