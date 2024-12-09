import { hashPassword } from '../../auth/bcrypt.config';
import { executeQuery } from '../../shared/infra/mysql/db.mysql';
import { CreateOrUpdateUserDto } from '../domain/dtos/createOrUpdateUser.dto';
import { CreateOrUpdateUserRepository } from '../domain/repositories/createOrUpdateUser.repository';

export class CreateOrUpdateUserMySql implements CreateOrUpdateUserRepository {
  async run(data: CreateOrUpdateUserDto, id?: number) {
    let sql = '';
    let params: any[] = [];

    if (id) {
      if (data.user.password) {
        const hashedPassword = await hashPassword(data.user.password);
        sql =
          'UPDATE users SET idPerson=?, username=?, password=?, idRole=?, idStatus=?, idCity WHERE id = ?';
        params = [
          data.user.idPerson,
          data.user.username,
          hashedPassword,
          data.user.idRole,
          data.user.idStatus,
          data.user.idCity,
          id,
        ];
      } else {
        sql =
          'UPDATE users SET idPerson=?, username=?, idRole=?, idStatus=?, idCity WHERE id = ?';
        params = [
          data.user.idPerson,
          data.user.username,
          data.user.idRole,
          data.user.idStatus,
          data.user.idCity,
          id,
        ];
      }
    } else {
      const hashedPassword = await hashPassword(data.user.password);
      sql =
        'INSERT INTO users (idPerson, username, password, idRole, idStatus, idCity) VALUES (?, ?, ?, ?, ?, ?)';
      params = [
        data.user.idPerson,
        data.user.username,
        hashedPassword,
        data.user.idRole,
        data.user.idStatus,
        data.user.idCity
      ];
    }

    return executeQuery(sql, params);
  }
}
