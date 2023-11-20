import { GetSubCategoriesByIdService } from '../domain/services/getSubCategoriesById.service';
import { GetSubCategoriesByIdMySql } from '../infra/getSubCategoriesById.msql';

export class GetSubCategoriesByIdApp {
  async run(id: number) {
    try {
      const getSubCategoriesById = new GetSubCategoriesByIdService(
        new GetSubCategoriesByIdMySql(),
      );
      const subCategories = await getSubCategoriesById.run(id);
      return subCategories;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
