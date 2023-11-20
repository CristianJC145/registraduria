import { executeQuery } from '../../shared/infra/mysql/db.mysql';
import { GetProductSubcategoryByIdRepository } from '../domain/repositories/getProductSubcateforyById.repository';

export class GetSubCategoriesByIdMySql implements GetProductSubcategoryByIdRepository {
  async run(id: number) {
    const sql = 'SELECT id, `name` FROM subcategories WHERE category_id=?';
    return executeQuery(sql, [id]);
  }
}
