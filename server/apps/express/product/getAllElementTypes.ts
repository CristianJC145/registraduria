import { Request, Response } from 'express';
import { GetAllElementTypesApp } from '../../../src/product/app/getAllElementType.app';

const GetAllElementType = async (_req: Request, res: Response) => {
  try {
    const getAllElementTypesApp = new GetAllElementTypesApp();
    const elementTypesApp = await getAllElementTypesApp.run();
    return res.json(elementTypesApp);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetAllElementType,
};
