import configureApi from '../../../shared/utils/axios'
import {services} from '../../../shared/constant/services'
import { ParamsPaginationDto } from '../../../shared/dtos/paramsPagination.dto'

export class GetProductsWithPaginationService {
    run(params: ParamsPaginationDto) {
        return configureApi().get(`${services.products}/list`, {params} )
        .then((response) => response.data);
    }
}