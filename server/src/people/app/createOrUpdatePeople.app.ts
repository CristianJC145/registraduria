import { CreateOrUpdatePeopleDto } from '../domain/dtos/createOrUpdatePeople.dto';
import { CreateOrUpdatePeopleService } from '../domain/services/createOrUpdatePeople.service';
import { CreateOrUpdatePeopleMySql } from '../infra/createOrUpdatePeople.mysql';

export class CreateOrUpdatePeopleApp {
  async run(data: CreateOrUpdatePeopleDto, id?: number) {
    const createOrUpdatePeople = new CreateOrUpdatePeopleService(
      new CreateOrUpdatePeopleMySql(),
    );

    return createOrUpdatePeople.run(data, id);
  }
}
