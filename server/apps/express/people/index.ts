import { Router } from 'express';
import { GetPeopleWithPagination } from './getPeopleWithPagination';
import { CreateOrUpdatePeople } from './createOrUpdateUser';
import { DeletePeopleById } from './deletePeopleById';
import { GetPeopleById } from './getPeopleById';


const peopleRouter = Router();

const basePathApi = '/api/people';

peopleRouter.post(`${basePathApi}`, CreateOrUpdatePeople)
peopleRouter.put(`${basePathApi}/:id`, CreateOrUpdatePeople)
peopleRouter.get(`${basePathApi}/list`, GetPeopleWithPagination);
peopleRouter.get(`${basePathApi}/list/:id`, GetPeopleById);
peopleRouter.delete(`${basePathApi}/:id`, DeletePeopleById)


export {
    peopleRouter,
};
