import { PeopleModel } from '../../../shared/domain/models/people.model';

export interface CreateOrUpdatePeopleDto {
  people: PeopleModel;
}
