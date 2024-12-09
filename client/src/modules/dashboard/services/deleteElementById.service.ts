import configureApi from "../../../shared/utils/axios";
import { services } from "../../../shared/constant/services";

export class DeleteElementByIdService {
    async run(id: number) : Promise<void> {
        await configureApi().delete(`${services.products}/element/${id}`);
    }
}