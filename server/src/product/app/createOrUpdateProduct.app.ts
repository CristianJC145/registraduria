import { CreateOrUpdateProductDto } from '../domain/dtos/createOrUpdateUser.dto';
import { CreateOrUpdateProductService } from '../domain/services/createOrUpdateProduct.service';
import { CreateOrUpdateProductMySql } from '../infra/createOrUpdateProducts.mysql';
export class CreateOrUpdateProductApp {
  async run(data: CreateOrUpdateProductDto, id?: number) {
    try {
      const createOrUpdateProduct = new CreateOrUpdateProductService(new CreateOrUpdateProductMySql());
      const result = await createOrUpdateProduct.run(data, id);
      return id || result.insertId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
