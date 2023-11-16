import { Request, Response } from 'express';
import { GetProductConditionsApp } from '../../../src/product/app/getProductConditions.app';

const GetProductConditions = async (_req: Request, res: Response) => {
  try {
    const getProductConditionsApp = new GetProductConditionsApp();
    const conditions = await getProductConditionsApp.run();
    return res.json(conditions);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetProductConditions,
};
