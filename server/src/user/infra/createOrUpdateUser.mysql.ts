import { executeQuery } from '../../shared/infra/mysql/db.mysql';
import { CreateOrUpdateUserDto } from '../domain/dtos/createOrUpdateUser.dto';
import { CreateOrUpdateUserRepository } from '../domain/repositories/createOrUpdateUser.repository';

export class CreateOrUpdateUserMySql implements CreateOrUpdateUserRepository {
  async run(data: CreateOrUpdateUserDto, id?: number) {
    let sql = '';
    if (id) {
      sql = 'UPDATE user SET name=?, phone=? WHERE id = ?';
    } else {
      sql = 'INSERT INTO user (name, phone) VALUES (?, ?)';
    }

    return executeQuery(sql, [data.user.name, data.user.phone, id]);
  }
}
