import { Request, Response } from 'express';
import { GetPeopleByIdApp } from '../../../src/user/app/getPeopleById.app';

const GetPeopleById = async (req: Request, res: Response) => {
  try {
    const getPeopleByIdApp = new GetPeopleByIdApp();
    const id = parseInt(req.params.id, 10);
    const user = await getPeopleByIdApp.run(id);
    return res.json(user);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetPeopleById,
};
