import { executeQuery } from '../../shared/infra/mysql/db.mysql';
import { InsertSubcategoryRepository } from '../domain/repositories/insertSubcategories.repository';

export class InsertSubcategoriesMySql implements InsertSubcategoryRepository {
  async run(product_id: number, subcategory_id: number) {
    const sql = 'INSERT INTO product_subcategories(product_id, subcategory_id) VALUES (?,?)';
    return executeQuery(sql, [product_id, subcategory_id]);
  }
}
