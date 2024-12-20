import {CreateOrUpdateBaseService} from '../../../shared/services/createOrUpdateBase.service';
import {services} from '../../../shared/constant/services';
import { PeopleDto } from '../dtos/people.dto';

export class CreateOrUpdatePeopleService extends CreateOrUpdateBaseService<PeopleDto> {
    url = `${services.people}`;
    isFormData = true;
}