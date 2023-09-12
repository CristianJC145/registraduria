import { CreateOrUpdateUserDto } from '../dtos/createOrUpdateUser.dto';

export interface CreateOrUpdateUserRepository {
  run(data: CreateOrUpdateUserDto, id?: number)
}
