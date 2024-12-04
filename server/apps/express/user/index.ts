import { Router } from 'express';
import { CreateOrUpdateUser } from './createOrUpdateUser';
import { GetUserByName } from './getUserByName';
import { GetUsersWithPagination } from './getUsersWithPagination';
import { DeleteUserById } from './deleteUserById';
import { GetUserById } from './getUserById';
import { GetPeopleById } from './getPeopleById';


const userRouter = Router();

const basePathApi = '/api/users';

userRouter.post(`${basePathApi}`, CreateOrUpdateUser);
userRouter.put(`${basePathApi}/:id`, CreateOrUpdateUser);
userRouter.get(`${basePathApi}/search`, GetUserByName);
userRouter.get(`${basePathApi}/list`, GetUsersWithPagination);
userRouter.get(`${basePathApi}/:id`, GetUserById);
userRouter.get(`${basePathApi}/people/:id`, GetPeopleById);
userRouter.delete(`${basePathApi}/:id`, DeleteUserById);



export {
  userRouter,
};
