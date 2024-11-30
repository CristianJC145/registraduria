import { Request, Response } from 'express';
import { GetUserByNameMySql } from '../../../src/user/infra/getUsersByName.mysql';

const GetUserByName = async (req: Request, res: Response) => {
    const { query } = req.query 
    try {
        const  getUserByName = new GetUserByNameMySql()
        const search = await getUserByName.run(query as string);
        console.log(search);
        return res.json(search);
    } catch (e) {
        return res.status(404).send(e.message);
    }
}
export {
    GetUserByName
}