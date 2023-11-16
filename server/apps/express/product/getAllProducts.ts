import { Request, Response } from 'express';
import { GetAllProductsApp } from '../../../src/product/app/getAllProducts.app';

const GetAllProducts = async (_req: Request, res: Response) => {
  try {
    const getAllProductsApp = new GetAllProductsApp();
    const products = await getAllProductsApp.run();
    return res.json(products);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetAllProducts,
};
