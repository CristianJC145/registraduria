import { executeQuery } from '../../shared/infra/mysql/db.mysql';

export class LogoutUserMySql {
  async run(sessionId: string) {
    const sql = 'DELETE FROM ActiveSessions WHERE sessionId = ?';
    return executeQuery(sql, [sessionId]);
  }
}
