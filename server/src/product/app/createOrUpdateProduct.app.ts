import { CreateOrUpdateProductDto } from "../domain/dtos/createOrUpdateUser.dto";
import { CreateOrUpdateProductService } from "../domain/services/createOrUpdateProduct.service";
import { CreateOrUpdateProductMySql } from "../infra/createOrUpdateUser.mysql";

export class CreateOrUpdateProductApp {
    async run(data: CreateOrUpdateProductDto, id?: number) {
        const createOrUpdateProduct = new CreateOrUpdateProductService(
            new CreateOrUpdateProductMySql(),
        );
        return createOrUpdateProduct.run(data, id);
    }
}