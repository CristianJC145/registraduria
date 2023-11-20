import { GetSubCategoriesByIdRepository } from '../repositories/getSubCategoriesById.repository';

export class GetSubCategoriesByIdService {
  constructor(
    private getSubCategoriesById : GetSubCategoriesByIdRepository,
  ) {}

  async run(id: number) {
    return this.getSubCategoriesById.run(id);
  }
}
