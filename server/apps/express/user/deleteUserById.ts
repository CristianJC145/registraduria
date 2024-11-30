import { Request, Response } from 'express';
import { DeleteUserByIdApp } from '../../../src/user/app/deleteUserById.app';


const DeleteUserById = async (req: Request, res: Response) => {
  try {
    const deleteUserByIdApp = new DeleteUserByIdApp();
    const id = parseInt(req.params.id, 10);
    const result = await deleteUserByIdApp.run(id);
    return res.json(result);
  } catch (e) {
    console.log(e);
    return res.status(404).send(e.message);
  }
};

export {
    DeleteUserById, 
};
