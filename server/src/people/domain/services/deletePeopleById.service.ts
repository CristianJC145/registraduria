import { DeleteRecordsByIdRepository } from '../../../shared/domain/repositories/deleteRecordsById.repository';

export class DeletePeopleByIdService {
  constructor(
    private deletePeopleById : DeleteRecordsByIdRepository,
  ) {}

  async run(id: number) {
    await this.deletePeopleById.run('people', 'id', id)

    return { id };
  }
}
