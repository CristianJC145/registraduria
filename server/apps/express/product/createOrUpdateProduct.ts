import { Request, Response } from 'express';
import { CreateOrUpdateProductApp } from '../../../src/product/app/createOrUpdateProduct.app';
import { CreateOrUpdateProductDto } from '../../../src/product/domain/dtos/createOrUpdateUser.dto';

const CreateOrUpdateProduct = async (req: Request, res: Response) =>{
  try {
    const request = req.body;

    const images = req.body.images || [];

    const data : CreateOrUpdateProductDto = {
      product : request,
      images: images.map((image: any) => (
        {
          filename: image.path,
          path: `../resources/images/${image.path}`,
        }
      )),
    }
    
    const { id } = req.params
    const createOrUpdateProductApp = new CreateOrUpdateProductApp(); 
    const result = await createOrUpdateProductApp.run(data, parseInt(id, 10));
    return res.json(id ?? result.insertId);
  }
  catch (e) {
    console.log(e);
    return res.send(e);
  }
}
export {
  CreateOrUpdateProduct
};