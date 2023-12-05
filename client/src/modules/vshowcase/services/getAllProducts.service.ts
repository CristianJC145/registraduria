import configureApi from '../../../shared/utils/axios'
import {services} from '../../../shared/constant/services'

export class GetAllProductsService {
    run() {
        return configureApi().get(`${services.products}/`)
        .then((response) => response.data);
    }
}