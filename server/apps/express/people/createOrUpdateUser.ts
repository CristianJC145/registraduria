import { Request, Response } from 'express';
import { CreateOrUpdatePeopleApp } from '../../../src/people/app/createOrUpdatePeople.app';
import { CreateOrUpdatePeopleDto } from '../../../src/people/domain/dtos/createOrUpdatePeople.dto';

const CreateOrUpdatePeople = async (req: Request, res: Response) => {
  try {
    const request = req.body;

    const data: CreateOrUpdatePeopleDto = {
      people: request,
    };

    const { id } = req.params;

    const createOrUpdatePeopleApp = new CreateOrUpdatePeopleApp();

    const result = await createOrUpdatePeopleApp.run(data, parseInt(id, 10));

    return res.json(id ?? result.insertId);
  } catch (e) {
    console.log(e);
    return res.send(e);
  }
};

export {
  CreateOrUpdatePeople,
};
