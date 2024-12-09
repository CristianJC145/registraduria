import { Request, Response } from 'express';
import { DeleteElementByIdApp } from '../../../src/product/app/deleteElementById.app';


const DeleteElementById = async (req: Request, res: Response) => {
  try {
    const deleteElementByIdApp = new DeleteElementByIdApp();
    const id = parseInt(req.params.id, 10);
    const result = await deleteElementByIdApp.run(id);
    return res.json(result);
  } catch (e) {
    console.log(e);
    return res.status(404).send(e.message);
  }
};

export {
  DeleteElementById, 
};
