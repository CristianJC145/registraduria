import configureApi from "../../../shared/utils/axios";
import { services } from "../../../shared/constant/services";

export class DeletePeopleByIdService {
    async run(id: number) : Promise<void> {
        await configureApi().delete(`${services.people}/${id}`);
    }
}