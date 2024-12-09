import { services } from '../../../shared/constant/services'
import configureApi from '../../../shared/utils/axios'

export class GetAllCitiesService {
    run() {
        return configureApi().get(`${services.users}/cities`)
        .then(response => response.data);
    }
}