import { GetRecordsByFieldRepository } from '../repositories/getRecordsByField.repository';

export class GetRecodsByFieldService {
  constructor(
    private getRecordsByField: GetRecordsByFieldRepository,
  ) {}

  async run(field: string, table: string, row: string, id : number) {
    return this.getRecordsByField.run(field, table, row, id);
  }
}
