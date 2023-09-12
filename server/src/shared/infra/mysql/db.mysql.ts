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

export {
  executeQuery,
};
