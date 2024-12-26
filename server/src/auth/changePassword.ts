import { Request, Response } from 'express';
import { GetPasswordByUserIdMySql } from '../user/infra/getPasswordByIdUser.mysql';
import { comparePassword, hashPassword } from './bcrypt.config';
import { ChangePasswordUserMySql } from '../user/infra/changePasswordUser.mysql';

const getPasswordByUserIdMySql = new GetPasswordByUserIdMySql();
const changePasswordUserMySql = new ChangePasswordUserMySql();

export const ChangePassword = async (req: Request, res: Response) => {
    const { current_password, new_password } = req.body;

    const id = parseInt(req.params.id, 10);
    try {
        const passwordUser = await getPasswordByUserIdMySql.run(id);
        const isPasswordValid = await comparePassword(current_password, passwordUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña actual incorrecta.' });
        }
        const hashedPassword = await hashPassword(new_password);
        await changePasswordUserMySql.run(hashedPassword, id);
        res.json(id);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}