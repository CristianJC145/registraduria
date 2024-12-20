import { Request, Response } from 'express';
import { DeletePeopleByIdApp } from '../../../src/people/app/deletePeopleById.app';


const DeletePeopleById = async (req: Request, res: Response) => {
  try {
    const deletePeopleByIdApp = new DeletePeopleByIdApp();
    const id = parseInt(req.params.id, 10);
    const result = await deletePeopleByIdApp.run(id);
    return res.json(result);
  } catch (e) {
    console.log(e);
    return res.status(404).send(e.message);
  }
};

export {
  DeletePeopleById, 
};
