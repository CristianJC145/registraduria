import { Request, Response } from 'express';
import { CreateOrUpdateProductApp } from '../../../src/product/app/createOrUpdateProduct.app';
import { CreateOrUpdateProductDto } from '../../../src/product/domain/dtos/createOrUpdateUser.dto';

const CreateOrUpdateProduct = async (req: Request, res: Response) => {
  try {
    const request = req.body;

    const files = req.files as any[];
    const subcategories = request.subcategoryId || [];

    const images = files.map((file) => file.path.replace('\\', '/'));
    const subcategoriesData = subcategories.map((subcategory: { value: any; }) => subcategory.value);

    const data : CreateOrUpdateProductDto = {
      product: request,
      images,
    };

    data.product.subcategoriesId = subcategoriesData;

    const id = req.params.id ? parseInt(req.params.id, 10) : null;

    data.product.subcategoriesId = subcategories;
    const createOrUpdateProductApp = new CreateOrUpdateProductApp();
    const result = await createOrUpdateProductApp.run(data, id);
    return res.json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'Error interno en el servidor' });
  }
};
export {
  CreateOrUpdateProduct,
};
