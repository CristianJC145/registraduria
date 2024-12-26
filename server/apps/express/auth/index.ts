import { Router } from 'express';
import { Login } from '../../../src/auth/auth';
import { Logout } from '../../../src/auth/logout';
import { ChangePassword } from '../../../src/auth/changePassword';

const authRouter = Router();

const basePathApi = '/api/users';

authRouter.post(`${basePathApi}/login`, Login);
authRouter.delete(`${basePathApi}/logout/:sessionId`, Logout );
authRouter.put(`${basePathApi}/change-password/:id`, ChangePassword );

export {
  authRouter,
};
