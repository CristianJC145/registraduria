import { executeQuery } from '../../shared/infra/mysql/db.mysql';
import { CreateOrUpdateProductDto } from '../domain/dtos/createOrUpdateUser.dto';
import { CreateOrUpdateProductRepository } from '../domain/repositories/createOrUpdateProduct.repository';

export class CreateOrUpdateProductMySql implements CreateOrUpdateProductRepository {
  async run(data: CreateOrUpdateProductDto, id?: number) {
    let sql = '';
    const { images } = data;
    const imagesString = images.join(',');
    if (id) {
      sql = 'UPDATE products SET images=?, `name`=?, stock=?, price=?, state=?, description=?, condition_id=?, user_id=?, category_id=?  WHERE id=?';
    } else {
      sql = 'INSERT INTO products (images, `name`, stock, price, state, description, condition_id, user_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    }
    return executeQuery(sql, [imagesString, data.product.name, data.product.stock, data.product.price, data.product.state, data.product.description, data.product.conditionId, data.product.userId, data.product.productCategoryId, id]);
  }
}
