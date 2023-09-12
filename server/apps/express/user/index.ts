import { Router } from 'express';
import { CreateOrUpdateUser } from './createOrUpdateUser';

const userRouter = Router();

const basePathApi = '/api/users';

userRouter.post(`${basePathApi}`, CreateOrUpdateUser);
userRouter.put(`${basePathApi}/:id`, CreateOrUpdateUser);

export {
  userRouter,
};
