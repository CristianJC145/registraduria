import { DeleteRecordsByIdRepository } from '../../../shared/domain/repositories/deleteRecordsById.repository';

export class DeleteUserByIdService {
  constructor(
    private deleteUserById : DeleteRecordsByIdRepository,
  ) {}

  async run(id: number) {
    await Promise.all([
      this.deleteUserById.run('users', 'idUser', id),
    ]);

    return { id };
  }
}
