import configureApi from "../../../shared/utils/axios"; 
import { services } from "../../../shared/constant/services";

export class GetPeopleByIdService {
    run(id: number) {
        return (configureApi().get(`${services.users}/people/${id}`))
        .then((response) => response.data);
    }
}