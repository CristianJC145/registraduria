import { Request, Response } from 'express';
import { GetUserByIdApp } from '../../../src/user/app/getUserById.app';

const GetUserById = async (req: Request, res: Response) => {
  try {
    const getUserByIdApp = new GetUserByIdApp();
    const id = parseInt(req.params.id, 10);
    const user = await getUserByIdApp.run(id);
    return res.json(user);
  } catch (e) {
    console.log(e);

    return res.status(404).send(e.message);
  }
};

export {
  GetUserById,
};
