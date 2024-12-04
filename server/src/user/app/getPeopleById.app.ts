import { GetRecordsByIdMySql } from '../../shared/infra/mysql/getRecordsById.mysql';
import { GetPeopleByIdService } from '../domain/services/getPeopleById.service';

export class GetPeopleByIdApp {
  async run(id: number) {
    try {
      const getPeopleById = new GetPeopleByIdService(new GetRecordsByIdMySql());
      const peopleById = await getPeopleById.run('people', id);
      const result = { peopleById };
      return result.peopleById;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
