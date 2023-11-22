import configureApi from "../../../shared/utils/axios";
import { services } from "../../../shared/constant/services";

export class DeleteProductByIdService {
    async run(id: number) : Promise<void> {
        await configureApi().delete(`${services.products}/product/${id}`);
    }
}