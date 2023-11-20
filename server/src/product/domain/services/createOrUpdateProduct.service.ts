import { CreateOrUpdateProductDto } from '../dtos/createOrUpdateUser.dto';
import { CreateOrUpdateProductRepository } from '../repositories/createOrUpdateProduct.repository';
import { InsertSubcategoryRepository } from '../repositories/insertSubcategories.repository';

export class CreateOrUpdateProductService {
  constructor(
    private createOrUpdateProduct : CreateOrUpdateProductRepository,
    private insertSubcategory: InsertSubcategoryRepository,
  ) {}

  async run(data : CreateOrUpdateProductDto, id?: number) {
    const productResult = await this.createOrUpdateProduct.run(data, id);
    const productId = id || productResult.insertId;

    if (data.product.subcategoriesId && data.product.subcategoriesId.length > 0) {
      await Promise.all(data.product.subcategoriesId.map((subcategoryId) => this.insertSubcategory.run(productId, subcategoryId)));
    }
    return productId;
  }
}
