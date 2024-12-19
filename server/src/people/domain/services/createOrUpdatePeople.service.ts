import { CreateOrUpdatePeopleDto } from '../dtos/createOrUpdatePeople.dto';
import { CreateOrUpdatePeopleRepository } from '../repositories/createOrUpdatePeople.repository';

export class CreateOrUpdatePeopleService {
  constructor(
    private createOrUpdatePeople: CreateOrUpdatePeopleRepository,
  ) {}

  async run(data: CreateOrUpdatePeopleDto, id?: number) {
    return this.createOrUpdatePeople.run(data, id);
  }
}
