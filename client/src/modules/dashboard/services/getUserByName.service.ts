import configureApi from "../../../shared/utils/axios"; 
import { services } from "../../../shared/constant/services";

export class GetUserByNameService {
    run(search: string) {
        return (configureApi().get(`${services.users}/search?query=${search}`))
        .then((response) => response.data);
    }
}