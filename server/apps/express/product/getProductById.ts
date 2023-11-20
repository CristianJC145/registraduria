import { Request, Response } from 'express';
import { GetProductByIdApp } from '../../../src/product/app/getProductById.app';

const GetProductById = async (req: Request, res: Response) => {
  try {
    const getProductByIdApp = new GetProductByIdApp();
    const id = parseInt(req.params.id, 10);
    const product = await getProductByIdApp.run(id);
    return res.json(product);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetProductById,
};
