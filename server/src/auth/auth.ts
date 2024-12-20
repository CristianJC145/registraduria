import { Request, Response } from 'express';
import { GetUserAndPasswordMySql } from '../user/infra/getUserAndPassword.mysql';
import { comparePassword } from './bcrypt.config';
import { executeQuery } from '../shared/infra/mysql/db.mysql'; 

const jwt = require('jsonwebtoken');

const SECRET_KEY = 'default-secret-key';
const getUserAndPassword = new GetUserAndPasswordMySql();

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userCredentials = await getUserAndPassword.run(email);

    if (!userCredentials) {
      return res.status(401).json({ message: 'No hay ninguna cuenta asociada con este correo.' });
    }

    const isPasswordValid = await comparePassword(password, userCredentials.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    if (userCredentials.idStatus !== 1) {
      return res.status(403).json({ message: 'Cuenta deshabilitada. Contacta al administrador.' });
    }

    const token = jwt.sign(
      {
        id: userCredentials.idUser,
        username: userCredentials.username,
        idRole: userCredentials.idRole,
        idStatus: userCredentials.idStatus,
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    const sessionId = generateSessionId();
    const userId = userCredentials.idUser;

    await executeQuery(
      'INSERT INTO ActiveSessions (sessionId, userId) VALUES (?, ?) ON DUPLICATE KEY UPDATE updatedAt = CURRENT_TIMESTAMP',
      [sessionId, userId]
    );

    res.json({ token, sessionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const generateSessionId = () => {
  return Math.random().toString(36).substr(2, 9);
};
