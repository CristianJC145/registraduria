import { executeQuery } from '../../shared/infra/mysql/db.mysql';
import { CreateOrUpdateProductDto } from '../domain/dtos/createOrUpdateUser.dto';
import { CreateOrUpdateProductRepository } from '../domain/repositories/createOrUpdateProduct.repository';

export class CreateOrUpdateProductMySql implements CreateOrUpdateProductRepository {
  async run(data: CreateOrUpdateProductDto, id?: number) {
    let sql = '';
    const { images } = data;
    const imagesString = images.join(',');
    let params: any[] = [];
    if (id) {
      if (imagesString) {
        sql = 'UPDATE elements SET images=?, `elementName`=?, idElementType=?, material=?, color=?, model=?, serial=?, idCondition=?, idAvailability=?, warranty=?, idUser=?, dateCreation=? WHERE id=?';
        params = [imagesString, data.product.elementName, data.product.idElementType, data.product.material, data.product.color, data.product.model, data.product.serial, data.product.idCondition, data.product.idAvailability, data.product.warranty, data.product.idUser, data.product.dateCreation, id]
      } else {
        sql = 'UPDATE elements SET `elementName`=?, idElementType=?, material=?, color=?, model=?, serial=?, idCondition=?, idAvailability=?, warranty=?, idUser=?, dateCreation=? WHERE id=?';
        params = [data.product.elementName, data.product.idElementType, data.product.material, data.product.color, data.product.model, data.product.serial, data.product.idCondition, data.product.idAvailability, data.product.warranty, data.product.idUser, data.product.dateCreation, id]
      }
    } else {
      sql = 'INSERT INTO elements (images, elementName, idElementType, material, color, model, serial, idCondition, idAvailability, warranty,  idUser, dateCreation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      params = [imagesString, data.product.elementName, data.product.idElementType, data.product.material, data.product.color, data.product.model, data.product.serial, data.product.idCondition, data.product.idAvailability, data.product.warranty, data.product.idUser, data.product.dateCreation]
    }
    return executeQuery(sql, params);
  }
}
