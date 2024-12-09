import { services } from '../../../shared/constant/services'
import configureApi from '../../../shared/utils/axios'

export class GetAllElementTypesService {
    run() {
        return configureApi().get(`${services.products}/element-types`)
        .then(response => response.data);
    }
}