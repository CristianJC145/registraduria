import { GetRecordsByFieldRepository } from '../../domain/repositories/getRecordsByField.repository';
import { getByByTable } from './db.mysql';

export class GetRecordsByFieldMySql implements GetRecordsByFieldRepository {
  async run(field: string, table: string, row: string, id: number): Promise<any[]> {
    return getByByTable(field, table, row, id);
  }
}
