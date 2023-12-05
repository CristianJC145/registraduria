import * as mysql from 'mysql';

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ', error);
  }
});

function executeQuery(sql: string, params: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, rows) => {
      if (error) reject(error);
      resolve(rows);
    });
  });
}

function getAllByTable(table: string): Promise<any[]> {
  const sql = `SELECT * FROM ${table}`;
  return new Promise((resolve, reject) => {
    connection.query(sql, [table], (error, rows) => {
      if (error) reject(error);
      resolve(rows);
    });
  });
}

function getByIdTable(table: string, id: number): Promise<any[]> {
  const sql = `SELECT * FROM ${table} WHERE id=${id}`;
  const params = [table, id];
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, rows) => {
      if (error) reject(error);
      resolve(rows);
    });
  });
}

function getByByTable(field: string, table: string, row : string, id: number): Promise<any[]> {
  const sql = `SELECT ${field} FROM ${table} WHERE ${row}= ${id}`;
  const params = [field, table, row, id];
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, rows) => {
      if (error) reject(error);
      resolve(rows);
    });
  });
}

function deleteRecord(table: string, field : string, id: number): Promise<any[]> {
  const sql = `DELETE FROM ${table} WHERE ${field}=${id}`;
  const params = [table, field, id];
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
}

function first(sql, params = []): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      if (rows.length > 0) {
        resolve(JSON.parse(JSON.stringify(rows[0])));
      } else {
        resolve(null);
      }
    });
  });
}

async function getDataWithPagination({
  sql,
  params,
  paramsSQL,
  columnsSearch,
} : {
  sql: string,
  params: { search?: string, page, perPage, sort: string, order: string },
  paramsSQL?: string[],
  columnsSearch?: string[],
}) {
  const originalSQL = sql;
  paramsSQL = paramsSQL && paramsSQL.length ? paramsSQL : [];

  let { page, perPage, order } = params;
  const { search, sort } = params;

  order = order !== null && order !== 'null' ? order : 'asc';

  const paramsSearch = [];

  if (search && columnsSearch && columnsSearch.length) {
    columnsSearch.forEach((col) => {
      paramsSearch.push(`${col} LIKE ?`);
      paramsSQL.push(`%${search}%`);
    });
    if (originalSQL.toLowerCase().includes('where')) {
      sql += ` AND (${paramsSearch.join(' OR ')})`;
    } else {
      sql += ` WHERE ${paramsSearch.join(' OR ')}`;
    }
  }

  if (sort) {
    sql += ' ORDER BY ? ?';
    paramsSQL.push(...[sort, order]);
  }

  page = typeof page === 'string' && page !== null && page !== 'null' ? parseInt(page, 10) : 1;
  perPage = typeof perPage === 'string' && perPage !== null && perPage !== 'null' ? parseInt(perPage, 10) : 10;

  let offset = 0;

  if (page > 1) {
    offset = (page - 1) * perPage;
  }

  sql += ` LIMIT ${perPage} OFFSET ${offset}`;

  const countQuery = `SELECT COUNT(*) as total FROM (${originalSQL}) AS total`;

  const totalCount = await first(countQuery, paramsSQL);
  const { total } = totalCount;

  const data = await executeQuery(sql, paramsSQL);

  return {
    total, page, perPage, data,
  };
}
export {
  executeQuery,
  getAllByTable,
  getByIdTable,
  deleteRecord,
  getDataWithPagination,
  getByByTable,
};
