import { Request, Response } from 'express';
import { CreateOrUpdateUserApp } from '../../../src/user/app/createOrUpdateUser.app';
import { CreateOrUpdateUserDto } from '../../../src/user/domain/dtos/createOrUpdateUser.dto';

const CreateOrUpdateUser = async (req: Request, res: Response) => {
  try {
    const request = req.body;

    const data: CreateOrUpdateUserDto = {
      user: request,
    };

    const { id } = req.params;

    const createOrUpdateUserApp = new CreateOrUpdateUserApp();

    const result = await createOrUpdateUserApp.run(data, parseInt(id, 10));

    return res.json(id ?? result.insertId);
  } catch (e) {
    console.log(e);
    return res.send(e);
  }
};

export {
  CreateOrUpdateUser,
};
