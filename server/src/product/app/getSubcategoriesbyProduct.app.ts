import { GetSubcategoryByProductService } from '../domain/services/getSubcategoryByProduct.service';
import { GetSubcategoryByProductMySql } from '../infra/getSubcateroriesByProduct.mysql';

export class GetSubcategoriesByProductApp {
  async run(id: number) {
    try {
      const getSubcategoryByProduct = new GetSubcategoryByProductService(
        new GetSubcategoryByProductMySql(),
      );
      const subCategories = await getSubcategoryByProduct.run(id);
      return subCategories;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
