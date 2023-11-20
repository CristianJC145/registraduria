import { executeQuery } from '../../shared/infra/mysql/db.mysql';

export class GetUserAndPasswordMySql {
  async run(email: string) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await executeQuery(sql, [email]);

    if (!rows) {
      return null;
    }

    return {
      id: rows.id as number,
      name: rows.name as string,
      email: rows.email as string,
      password: rows.password as string,
      account_type_id: rows.account_type_id as number,
    };
  }
}
