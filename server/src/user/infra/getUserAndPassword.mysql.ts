import { executeQuery } from '../../shared/infra/mysql/db.mysql';

export class GetUserAndPasswordMySql {
  async run(email: string) {
    const sql = 'SELECT * FROM user WHERE email = ?';
    const [rows] = await executeQuery(sql, [email]);
    console.log(rows);

    if (!rows) {
      return null;
    }

    return {
      email: rows.email as string,
      password: rows.password as string,
    };
  }
}
