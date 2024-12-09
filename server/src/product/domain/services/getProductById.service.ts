import { GetRecordsByIdRepository } from '../../../shared/domain/repositories/getRecordsById.repository';

export class GetElementsByIdService {
  constructor(
    private getElementById : GetRecordsByIdRepository,
  ) {}

  async run(table: string, id: number) {
    const elementData = await this.getElementById.run(table, id);

    return elementData;
  }
}
