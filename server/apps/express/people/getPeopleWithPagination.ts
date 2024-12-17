import { Request, Response } from 'express';
import { getDataWithPagination } from '../../../src/shared/infra/mysql/db.mysql';

const GetPeopleWithPagination = async (req: Request, res: Response) => {
  try {
    const params = req.query as any;
    const paramsSQL = [];

    const sql = `SELECT * FROM people`;
    const people = await getDataWithPagination({
      sql, params, columnsSearch: ['name'], paramsSQL,
    });
    return res.json(people);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetPeopleWithPagination,
};
