import { Request, Response } from 'express';
import { getDataWithPagination } from '../../../src/shared/infra/mysql/db.mysql';

const GetUsersWithPagination = async (req: Request, res: Response) => {
  try {
    const params = req.query as any;
    const paramsSQL = [];

    const sql = `SELECT users.id, name, email, status.statusName, roleName FROM users
                INNER JOIN people ON users.idPerson = people.id
                INNER JOIN STATUS ON users.idStatus = status.idStatus
                INNER JOIN roles ON users.idRole = roles.idRole`;

    const users = await getDataWithPagination({
      sql, params, columnsSearch: ['name'], paramsSQL,
    });
    return res.json(users);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
    GetUsersWithPagination,
};
