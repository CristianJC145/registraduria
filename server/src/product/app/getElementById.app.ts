import { GetRecordsByIdMySql } from '../../shared/infra/mysql/getRecordsById.mysql';
import { GetElementsByIdService } from '../domain/services/getProductById.service';

export class GetElementByIdApp {
  async run(id: number) {
    try {
      const getElementById = new GetElementsByIdService(new GetRecordsByIdMySql());
      const elementById = await getElementById.run('elements', id);
      const result = { elementById };
      return result.elementById;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
