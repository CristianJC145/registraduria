import { executeQuery } from "../../shared/infra/mysql/db.mysql";
import { CreateOrUpdateProductDto } from "../domain/dtos/createOrUpdateUser.dto";
import { CreateOrUpdateProductRepository } from "../domain/repositories/createOrUpdateProduct.repository";

export class CreateOrUpdateProductMySql implements CreateOrUpdateProductRepository {
    async run(data: CreateOrUpdateProductDto, id?: number) {
        let sql = '';
        if (id) {
            sql = 'UPDATE products SET images=?, name_product=?, stock=?, price=?, state=?, description=?, product_category_id=?, condition_product=? WHERE id=?';
        } else {
            sql = 'INSERT INTO products (images, name_product, stock, price, state, description, product_category_id, condition_product) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
        }
        const img = Object.assign(data.images);
        return executeQuery(sql, [img, data.product.productName, data.product.stock, data.product.price, data.product.state, data.product.description, data.product.product_category_id, data.product.condition_product, id])
    }
}
