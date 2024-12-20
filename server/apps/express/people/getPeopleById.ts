import { Request, Response } from 'express';
import { GetPeopleByIdApp } from '../../../src/people/app/getPeopleById.app';

const GetPeopleById = async (req: Request, res: Response) => {
  try {
    const getPeopletByIdApp = new GetPeopleByIdApp();
    const id = parseInt(req.params.id, 10);
    const people = await getPeopletByIdApp.run(id);
    return res.json(people);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetPeopleById,
};
