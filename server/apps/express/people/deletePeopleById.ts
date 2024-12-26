import { Request, Response } from 'express';
import { DeletePeopleByIdApp } from '../../../src/people/app/deletePeopleById.app';
import { executeQuery } from '../../../src/shared/infra/mysql/db.mysql';


const DeletePeopleById = async (req: Request, res: Response) => {
  try {
    const deletePeopleByIdApp = new DeletePeopleByIdApp();
    const id = parseInt(req.params.id, 10);
    const [activeUser] = await executeQuery("SELECT * FROM users WHERE idPerson = ?", [id])
    if (activeUser) {
      return res.status(400).json({ message : 'Este funcionario tiene un usuario activo'})
    }
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
