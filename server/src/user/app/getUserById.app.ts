import { GetRecordsByIdMySql } from '../../shared/infra/mysql/getRecordsById.mysql';
import { GetUserByIdService } from '../domain/services/getUserById.service';

export class GetUserByIdApp {
  async run(id: number) {
    try {
      const getUserById = new GetUserByIdService(new GetRecordsByIdMySql());
      const userById = await getUserById.run('users', id);
      const result = { userById };
      return result.userById;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
