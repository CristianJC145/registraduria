import { GetAllRecodsService } from '../../shared/domain/services/getAllRecords.service';
import { GetAllRecordsMySql } from '../../shared/infra/mysql/getAllRecords.mysql';

export class GetAllElementTypesApp {
  async run() {
    const getAllElementTypesService = new GetAllRecodsService(
      new GetAllRecordsMySql(),
    );
    const elementTypes = await getAllElementTypesService.run('elementtypes');

    return elementTypes;
  }
}
