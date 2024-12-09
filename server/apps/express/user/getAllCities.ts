import { Request, Response } from 'express';
import { GetAllCitiesApp } from '../../../src/user/app/getAllCities.app';
const GetAllCities = async (_req: Request, res: Response) => {
  try {
    const getAllCitiesApp = new GetAllCitiesApp();
    const categories = await getAllCitiesApp.run();
    return res.json(categories);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetAllCities,
};
