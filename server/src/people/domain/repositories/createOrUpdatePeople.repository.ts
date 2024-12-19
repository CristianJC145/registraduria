import { CreateOrUpdatePeopleDto } from "../dtos/createOrUpdatePeople.dto"

export interface CreateOrUpdatePeopleRepository {
  run(data: CreateOrUpdatePeopleDto, id?: number)
}
