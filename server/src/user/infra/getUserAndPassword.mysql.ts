import { executeQuery } from '../../shared/infra/mysql/db.mysql';

export class GetUserAndPasswordMySql {
  async run(email: string) {
    const sql = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await executeQuery(sql, [email]);

    if (!rows) {
      return null;
    }

    return {
      idUser: rows.idUser as number,
      idPerson: rows.idPerson as number,
      username: rows.username as string,
      password: rows.password as string,
      idRole: rows.idRole as number,
    };
  }
}
