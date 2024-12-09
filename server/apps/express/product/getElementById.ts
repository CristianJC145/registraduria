import { Request, Response } from 'express';
import { GetElementByIdApp } from '../../../src/product/app/getElementById.app';

const GetElementById = async (req: Request, res: Response) => {
  try {
    const getElementByIdApp = new GetElementByIdApp();
    const id = parseInt(req.params.id, 10);
    const product = await getElementByIdApp.run(id);
    return res.json(product);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetElementById,
};
