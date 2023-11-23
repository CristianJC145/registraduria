import { Request, Response } from 'express';
import { getDataWithPagination } from '../../../src/shared/infra/mysql/db.mysql';

const GetProductsWithPagination = async (req: Request, res: Response) => {
  try {
    const params = req.query as any;
    let sqlwhere = '';
    const paramsSQL = [];
    if (params.id) {
      sqlwhere = 'where user_id = ?';
      paramsSQL.push(params.id);
    }

    const sql = `SELECT * FROM products ${sqlwhere}`;

    const products = await getDataWithPagination({
      sql, params, columnsSearch: ['name'], paramsSQL,
    });
    return res.json(products);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetProductsWithPagination,
};
