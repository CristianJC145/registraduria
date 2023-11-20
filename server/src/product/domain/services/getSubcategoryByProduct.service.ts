import { GetSubcategoryByProductRepository } from '../repositories/getSubcategoriesByProduct.repository';

export class GetSubcategoryByProductService {
  constructor(
    private getSubcategoryByProduct : GetSubcategoryByProductRepository,
  ) {}

  async run(id: number) {
    return this.getSubcategoryByProduct.run(id);
  }
}
