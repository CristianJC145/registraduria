import { executeQuery } from '../../shared/infra/mysql/db.mysql';

export class GetUserByNameMySql {
  async run(name: string) {
    const sql = 'SELECT id, name FROM people WHERE name LIKE ?';

    try {
      const result = await executeQuery(sql, [`${name}%`]);
      const rows = Array.isArray(result) ? result : result[0];
      if (!rows || !Array.isArray(rows) || rows.length === 0) {
        return null;
      }
      return rows.map((row: any) => ({
        idUser: row.id,
        name: row.name,
      }));
    } catch (error) {
      console.error('Error during query execution:', error);
      throw new Error('Error fetching data from database');
    }
  }
}
