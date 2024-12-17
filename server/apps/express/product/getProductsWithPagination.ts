import { Request, Response } from 'express';
import { getDataWithPagination } from '../../../src/shared/infra/mysql/db.mysql';

const GetProductsWithPagination = async (req: Request, res: Response) => {
  try {
    const params = req.query as any;
    const paramsSQL = [];
    const sql = `
        SELECT elements.*,
              DATE_FORMAT(dateCreation, '%Y-%m-%d') AS formattedDate,
              elementtypes.elementType,
              \`condition\`.conditionName,
              availability.availability
        FROM elements
        INNER JOIN elementtypes ON elements.idElementType = elementtypes.id
        INNER JOIN \`condition\` ON elements.idCondition = \`condition\`.id
        INNER JOIN availability ON elements.idAvailability = availability.id`;
    const products = await getDataWithPagination({
      sql, params, columnsSearch: ['elementName'], paramsSQL,
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
