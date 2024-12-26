import { executeQuery } from '../../shared/infra/mysql/db.mysql';

export class GetPasswordByUserIdMySql {
  async run(id: number) {
    const sql = 'SELECT password FROM users WHERE id=?';
    const [rows] = await executeQuery(sql, [id]);

    if (!rows) {
      return null;
    }

    return {
      password: rows.password as string,
    };
  }
}
