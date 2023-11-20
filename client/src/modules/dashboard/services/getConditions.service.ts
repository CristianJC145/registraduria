import { services } from '../../../shared/constant/services'
import configureApi from '../../../shared/utils/axios'

export class GetConditionsService {
    run() {
        return configureApi().get(`${services.products}/conditions`)
        .then(response => response.data);
    }
}