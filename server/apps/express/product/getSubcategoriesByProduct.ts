import { Request, Response } from 'express';
import { GetSubcategoriesByProductApp } from '../../../src/product/app/getSubcategoriesbyProduct.app';

const GetSubcategoriesByProduct = async (req: Request, res: Response) => {
  try {
    const getSubcategoriesByProductApp = new GetSubcategoriesByProductApp();
    const id = parseInt(req.params.id, 10);
    const subcategories = await getSubcategoriesByProductApp.run(id);
    return res.json(subcategories);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetSubcategoriesByProduct,
};
