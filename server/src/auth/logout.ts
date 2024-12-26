import { Request, Response } from 'express';
import { LogoutUserMySql } from '../user/infra/logoutUser.mysql';

const logoutUserMySql = new LogoutUserMySql();

export const Logout = async (req: Request, res: Response) => {
  const { sessionId } = req.params;

  try {
    await logoutUserMySql.run(sessionId);
    res.status(200).json({ message: 'Sesión cerrada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}