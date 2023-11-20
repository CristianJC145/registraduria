import { Request, Response } from 'express';
import { GetSubCategoriesByIdApp } from '../../../src/product/app/getSubCategoriesById.app';

const GetSubCategoriesById = async (req: Request, res: Response) => {
  try {
    const getSubCategoriesByIdApp = new GetSubCategoriesByIdApp();
    const id = parseInt(req.params.id, 10);
    const subCategories = await getSubCategoriesByIdApp.run(id);
    return res.json(subCategories);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetSubCategoriesById,
};
