import { Router } from 'express';
import { GetPeopleWithPagination } from './getPeopleWithPagination';


const peopleRouter = Router();

const basePathApi = '/api/people';

peopleRouter.get(`${basePathApi}/list`, GetPeopleWithPagination);


export {
    peopleRouter,
};
