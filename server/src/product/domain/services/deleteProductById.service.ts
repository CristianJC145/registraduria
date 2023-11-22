import { DeleteRecordsByIdRepository } from '../../../shared/domain/repositories/deleteRecordsById.repository';

export class DeleteProductByIdService {
  constructor(
    private deleteProductSubcategories: DeleteRecordsByIdRepository,
    private deleteProductById : DeleteRecordsByIdRepository,
  ) {}

  async run(id: number) {
    await Promise.all([
      this.deleteProductSubcategories.run('product_subcategories', 'product_id', id),
      this.deleteProductById.run('products', 'id', id),
    ]);

    return { id };
  }
}
