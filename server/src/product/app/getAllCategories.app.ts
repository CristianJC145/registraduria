import { GetAllRecodsService } from '../../shared/domain/services/getAllRecords.service';
import { GetAllRecordsMySql } from '../../shared/infra/mysql/getAllRecords.mysql';

export class GetAllCategoriesApp {
  async run() {
    const getAllCategoriesService = new GetAllRecodsService(
      new GetAllRecordsMySql(),
    );
    const categories = await getAllCategoriesService.run('categories');

    return categories;
  }
}
