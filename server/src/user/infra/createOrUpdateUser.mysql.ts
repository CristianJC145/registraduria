import { hashPassword } from '../../auth/bcrypt.config';
import { executeQuery } from '../../shared/infra/mysql/db.mysql';
import { CreateOrUpdateUserDto } from '../domain/dtos/createOrUpdateUser.dto';
import { CreateOrUpdateUserRepository } from '../domain/repositories/createOrUpdateUser.repository';

export class CreateOrUpdateUserMySql implements CreateOrUpdateUserRepository {
  async run(data: CreateOrUpdateUserDto, id?: number) {
    let sql = '';
    if (id) {
      sql = 'UPDATE users SET name=?, phone=? WHERE id = ?';
    } else {
      sql = 'INSERT INTO users (name, password, email, phone, account_type_id) VALUES (?, ?, ?, ?, ?)';
    }
    const hashedPassword = await hashPassword(data.user.password);
    return executeQuery(sql, [data.user.name, hashedPassword, data.user.email, data.user.phone, data.user.account_type_id, id]);
  }
}
