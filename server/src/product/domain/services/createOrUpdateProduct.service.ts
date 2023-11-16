import { CreateOrUpdateProductDto } from '../dtos/createOrUpdateUser.dto';
import { CreateOrUpdateProductRepository } from '../repositories/createOrUpdateProduct.repository';

export class CreateOrUpdateProductService {
  constructor(
    private createOrUpdateProduct : CreateOrUpdateProductRepository,
  ) {}

  async run(data : CreateOrUpdateProductDto, id?: number) {
    return this.createOrUpdateProduct.run(data, id);
  }
}
