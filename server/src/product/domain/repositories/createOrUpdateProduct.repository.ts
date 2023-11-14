import { CreateOrUpdateProductDto } from "../dtos/createOrUpdateUser.dto";

export interface CreateOrUpdateProductRepository {
    run(data : CreateOrUpdateProductDto, id?: number)
}