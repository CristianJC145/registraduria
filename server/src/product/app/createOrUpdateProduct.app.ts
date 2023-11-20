import { CreateOrUpdateProductDto } from '../domain/dtos/createOrUpdateUser.dto';
import { CreateOrUpdateProductService } from '../domain/services/createOrUpdateProduct.service';
import { CreateOrUpdateProductMySql } from '../infra/createOrUpdateProducts.mysql';
import { InsertSubcategoriesMySql } from '../infra/InsertSubcategories.mysql';

export class CreateOrUpdateProductApp {
  async run(data: CreateOrUpdateProductDto, id?: number) {
    try {
      const createOrUpdateProduct = new CreateOrUpdateProductService(new CreateOrUpdateProductMySql(), new InsertSubcategoriesMySql());
      const result = await createOrUpdateProduct.run(data, id);
      return id || result.insertId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
