import { Request, Response } from 'express';
import { DeleteProductByIdApp } from '../../../src/product/app/deleteProductById.app';

const DeleteProductById = async (req: Request, res: Response) => {
  try {
    const deleteProductByIdApp = new DeleteProductByIdApp();
    const id = parseInt(req.params.id, 10);
    const result = await deleteProductByIdApp.run(id);
    return res.json(result);
  } catch (e) {
    console.log(e);
    return res.status(404).send(e.message);
  }
};

export {
  DeleteProductById,
};
