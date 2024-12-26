import { Request, Response } from 'express';
import { DeleteUserByIdApp } from '../../../src/user/app/deleteUserById.app';
import { executeQuery } from '../../../src/shared/infra/mysql/db.mysql';


const DeleteUserById = async (req: Request, res: Response) => {
  try {
    const deleteUserByIdApp = new DeleteUserByIdApp();
    const id = parseInt(req.params.id, 10);
    const [activeSession] = await executeQuery("SELECT * FROM activesessions WHERE userId = ?", [id]);
    console.log("::::::::::::::::::::::::::::::::::::::", activeSession)
    if (activeSession) {
      console.log("usuario logeado no puede ser eliminado")
      return res.status(400).json({ message: 'No puedes eliminar un usuario con una sesión activa.' });
    }
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
