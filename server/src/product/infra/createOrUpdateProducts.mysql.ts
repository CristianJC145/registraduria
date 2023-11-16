import { executeQuery } from '../../shared/infra/mysql/db.mysql';
import { CreateOrUpdateProductDto } from '../domain/dtos/createOrUpdateUser.dto';
import { CreateOrUpdateProductRepository } from '../domain/repositories/createOrUpdateProduct.repository';

export class CreateOrUpdateProductMySql implements CreateOrUpdateProductRepository {
  async run(data: CreateOrUpdateProductDto, id?: number) {
    let sql = '';
    const { images } = data;
    const imagesString = images.join(',');

    console.log({ images }, 'product: ', data.product);

    console.log('Imágenes recibidas:', imagesString);
    if (id) {
      sql = 'UPDATE products SET images=?, `name`=?, stock=?, price=?, state=?, description=?, product_category_id=?, condition_id=? WHERE id=?';
    } else {
      sql = 'INSERT INTO products (images, `name`, stock, price, state, description, product_category_id, condition_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    }
    return executeQuery(sql, [imagesString, data.product.name, data.product.stock, data.product.price, data.product.state, data.product.description, data.product.product_category_id, data.product.condition_id, id]);
  }
}
