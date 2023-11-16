import { ProductModel } from '../../../shared/domain/models/products.models';

export interface CreateOrUpdateProductDto {
  product: ProductModel,
  images: string[],
}
