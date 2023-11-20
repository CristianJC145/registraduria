import { executeQuery } from '../../shared/infra/mysql/db.mysql';
import { GetSubcategoryByProductRepository } from '../domain/repositories/getSubcategoriesByProduct.repository';

export class GetSubcategoryByProductMySql implements GetSubcategoryByProductRepository {
  async run(id: number) {
    const sql = 'SELECT id, `name` FROM `subcategories` JOIN `product_subcategories` ON `subcategories`.`id` = `product_subcategories`.`subcategory_id` WHERE `product_id` = ?';
    return executeQuery(sql, [id]);
  }
}
