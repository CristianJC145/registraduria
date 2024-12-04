import { GetRecordsByIdRepository } from '../../../shared/domain/repositories/getRecordsById.repository';

export class GetUserByIdService {
  constructor(
    private getUserById : GetRecordsByIdRepository,
  ) {}

  async run(table: string, id: number) {
    const userData = await this.getUserById.run(table, id);

    return { userData };
  }
}
