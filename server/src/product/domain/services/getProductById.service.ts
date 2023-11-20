import { GetRecordsByFieldRepository } from '../../../shared/domain/repositories/getRecordsByField.repository';
import { GetRecordsByIdRepository } from '../../../shared/domain/repositories/getRecordsById.repository';

export class GetProductSubcategoryByIdService {
  constructor(
    private getProductById : GetRecordsByIdRepository,
    private getProductSubcategoryById : GetRecordsByFieldRepository,
  ) {}

  async run(table: string, id: number) {
    const [productData, subcategoryData] = await Promise.all([
      this.getProductById.run(table, id),
      this.getProductSubcategoryById.run('subcategory_id', 'product_subcategories', 'product_id', id),
    ]);

    return { productData, subcategoryData };
  }
}
