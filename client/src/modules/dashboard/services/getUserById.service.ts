import { services } from '../../../shared/constant/services'
import configureApi from '../../../shared/utils/axios'

export class GetUserByIdService {
    run(id: number) {
        return configureApi().get(`${services.users}/${id}`)
        .then(response => response.data);
    }
}