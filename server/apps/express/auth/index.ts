import { Router } from 'express';
import { login } from '../../../src/auth/auth';

const authRouter = Router();

const basePathApi = '/api/users';

authRouter.post(`${basePathApi}/login`, login);

export {
  authRouter,
};
