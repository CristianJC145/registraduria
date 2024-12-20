import { Router } from 'express';
import { Login } from '../../../src/auth/auth';
import { Logout } from '../../../src/auth/logout';

const authRouter = Router();

const basePathApi = '/api/users';

authRouter.post(`${basePathApi}/login`, Login);
authRouter.delete(`${basePathApi}/logout`, Logout );

export {
  authRouter,
};
