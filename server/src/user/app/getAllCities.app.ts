import { GetAllRecodsService } from '../../shared/domain/services/getAllRecords.service';
import { GetAllRecordsMySql } from '../../shared/infra/mysql/getAllRecords.mysql';

export class GetAllCitiesApp {
  async run() {
    const getAllCategoriesService = new GetAllRecodsService(
      new GetAllRecordsMySql(),
    );
    const cities = await getAllCategoriesService.run('cities');

    return cities;
  }
}
