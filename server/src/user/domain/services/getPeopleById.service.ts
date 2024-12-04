import { GetRecordsByIdRepository } from '../../../shared/domain/repositories/getRecordsById.repository';

export class GetPeopleByIdService {
  constructor(
    private getPeopleById : GetRecordsByIdRepository,
  ) {}

  async run(table: string, id: number) {
    const peopleData = await this.getPeopleById.run(table, id);

    return { peopleData };
  }
}
