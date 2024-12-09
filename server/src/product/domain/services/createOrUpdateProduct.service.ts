import { CreateOrUpdateProductDto } from '../dtos/createOrUpdateUser.dto';
import { CreateOrUpdateProductRepository } from '../repositories/createOrUpdateProduct.repository';

export class CreateOrUpdateProductService {
  constructor(
    private createOrUpdateProduct : CreateOrUpdateProductRepository,
  ) {}

  async run(data : CreateOrUpdateProductDto, id?: number) {
    const productResult = await this.createOrUpdateProduct.run(data, id);
    const productId = id || productResult.insertId;
    return productId;
  }
}
