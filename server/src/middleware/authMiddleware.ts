import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

const SECRET_KEY = '%jg1!#h%2wl33$v=l!y^74xg2mghgr4^li3$_c+*3dd(wp6_9=';

// eslint-disable-next-line consistent-return
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }
  // eslint-disable-next-line consistent-return
  jwt.verify(token, SECRET_KEY, (err, user) => {
    console.log(err);
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.body.user = user;
    next();
  });
};
