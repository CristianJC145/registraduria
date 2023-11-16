import { Request, Response } from 'express';
import { GetAllCategoriesApp } from '../../../src/product/app/getAllCategories.app';

const GetAllCategories = async (_req: Request, res: Response) => {
  try {
    const getAllCategoriesApp = new GetAllCategoriesApp();
    const categories = await getAllCategoriesApp.run();
    return res.json(categories);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetAllCategories,
};
