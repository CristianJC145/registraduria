import { services } from '../../../shared/constant/services'
import configureApi from '../../../shared/utils/axios'

export class GetAllCategoriesService {
    run() {
        return configureApi().get(`${services.products}/categories`)
        .then(response => response.data);
    }
}