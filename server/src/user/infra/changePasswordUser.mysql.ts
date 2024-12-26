import { executeQuery } from '../../shared/infra/mysql/db.mysql';

export class ChangePasswordUserMySql {
  async run(password: string, id: number) {
    const sql = 'UPDATE  users SET PASSWORD = ? WHERE id = ?';
    const params = [password, id]

    return executeQuery(sql, params);
  }
}
