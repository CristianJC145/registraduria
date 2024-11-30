import {CreateOrUpdateBaseService} from '../../../shared/services/createOrUpdateBase.service';
import {services} from '../../../shared/constant/services';
import { UsersDto } from '../dtos/user.dto';


export class CreateOrUpdateUserService extends CreateOrUpdateBaseService<UsersDto> {
    url = `${services.users}`;
}