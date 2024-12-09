import { DeleteRecordsByIdRepository } from '../../../shared/domain/repositories/deleteRecordsById.repository';

export class DeleteElementsByIdService {
  constructor(
    private deleteElementById : DeleteRecordsByIdRepository,
  ) {}

  async run(id: number) {
    await Promise.all([
      this.deleteElementById.run('elements', 'id', id),
    ]);

    return { id };
  }
}
