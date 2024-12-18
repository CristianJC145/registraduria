import { DeleteRecordsByIdRepository } from '../../../shared/domain/repositories/deleteRecordsById.repository';

export class DeleteProductByIdService {
  constructor(
    private deleteProductById : DeleteRecordsByIdRepository,
  ) {}

  async run(id: number) {
    await Promise.all([
      this.deleteProductById.run('products', 'id', id),
    ]);

    return { id };
  }
}
