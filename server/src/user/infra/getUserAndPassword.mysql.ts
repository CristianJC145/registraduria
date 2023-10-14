import { executeQuery } from '../../shared/infra/mysql/db.mysql';

export class GetUserAndPasswordMySql {
  async run(email: string) {
    const sql = 'SELECT * FROM user WHERE email = ?';
    const [rows] = await executeQuery(sql, [email]);

    if (!rows) {
      return null;
    }

    return {
      id: rows.id as number,
      name: rows.name as string,
      email: rows.email as string,
      password: rows.password as string,
    };
  }
}
