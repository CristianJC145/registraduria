import { Request, Response } from 'express';
import { getDataWithPagination } from '../../../src/shared/infra/mysql/db.mysql';

const GetProductsWithPagination = async (req: Request, res: Response) => {
  try {
    const params = req.query as any;
    const sqlwhere = params.state ? `where state = ${params.state}` : '';

    const sql = `SELECT * FROM products ${sqlwhere}`;

    const products = await getDataWithPagination({ sql, params, columnsSearch: ['name'] });
    return res.json(products);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetProductsWithPagination,
};
