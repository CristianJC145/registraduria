import { Request, Response } from 'express';
import { GetAllProductsWithSellerApp } from '../../../src/product/app/getAllProductsWithSeller';

const GetAllProductsWithSeller = async (_req: Request, res: Response) => {
  try {
    const getAllProductsWithSellerApp = new GetAllProductsWithSellerApp();
    const products = await getAllProductsWithSellerApp.run();
    return res.json(products);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetAllProductsWithSeller,
};
