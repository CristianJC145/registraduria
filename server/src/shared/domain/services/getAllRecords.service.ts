import { GetAllRecordsRepository } from '../repositories/getAllRecords.repository';

export class GetAllRecodsService {
  constructor(
    private getAllRecords: GetAllRecordsRepository,
  ) {}

  async run(table: string) {
    return this.getAllRecords.run(table);
  }
}
