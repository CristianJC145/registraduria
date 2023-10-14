import { Request, Response } from 'express';
import { GetUserAndPasswordMySql } from '../user/infra/getUserAndPassword.mysql';
import { comparePassword } from './bcrypt.config';

const jwt = require('jsonwebtoken');

const SECRET_KEY = '%jg1!#h%2wl33$v=l!y^74xg2mghgr4^li3$_c+*3dd(wp6_9=';
const getUserAndPassword = new GetUserAndPasswordMySql();

// eslint-disable-next-line consistent-return
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userCredentials = await getUserAndPassword.run(email);
    if (!userCredentials) {
      return res.status(401).json({ message: 'No hay ninguna cuenta asociada con este correo electronico ingresado, porfavor ingresa un correo valido' });
    }
    const isPasswordValid = await comparePassword(password, userCredentials.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'La contraseña ingresada no es correcta' });
    }
    const token = jwt.sign({ id: userCredentials.id, name: userCredentials.name, email: userCredentials.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
