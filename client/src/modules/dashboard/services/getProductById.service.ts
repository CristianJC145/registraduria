import { services } from '../../../shared/constant/services'
import configureApi from '../../../shared/utils/axios'

export class GetProductByIdService {
    run(id: number) {
        return configureApi().get(`${services.products}/product/${id}`)
        .then(response => response.data);
    }
}