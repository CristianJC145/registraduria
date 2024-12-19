import { Router } from 'express';
import { GetPeopleWithPagination } from './getPeopleWithPagination';
import { CreateOrUpdatePeople } from './createOrUpdateUser';


const peopleRouter = Router();

const basePathApi = '/api/people';

peopleRouter.post(`${basePathApi}`, CreateOrUpdatePeople)
peopleRouter.put(`${basePathApi}/:id`, CreateOrUpdatePeople)
peopleRouter.get(`${basePathApi}/list`, GetPeopleWithPagination);


export {
    peopleRouter,
};
