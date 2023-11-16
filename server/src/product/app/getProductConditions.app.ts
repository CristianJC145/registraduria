import { GetAllRecodsService } from '../../shared/domain/services/getAllRecords.service';
import { GetAllRecordsMySql } from '../../shared/infra/mysql/getAllRecords.mysql';

export class GetProductConditionsApp {
  async run() {
    const getProductConditionsService = new GetAllRecodsService(
      new GetAllRecordsMySql(),
    );
    const conditions = await getProductConditionsService.run('conditions');

    return conditions;
  }
}
