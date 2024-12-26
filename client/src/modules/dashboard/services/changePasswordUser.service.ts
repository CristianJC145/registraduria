import configureApi from "../../../shared/utils/axios";
import { services } from "../../../shared/constant/services";

export class ChangePasswordUserService<T extends Record<string, any>> {
    async run({id, data} : {id: number, data: T}) : Promise<void> {
        await configureApi().put(`${services.users}/change-password/${id}`, data);
    }
}