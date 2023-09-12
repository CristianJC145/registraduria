import { CreateOrUpdateUserDto } from '../dtos/createOrUpdateUser.dto';
import { CreateOrUpdateUserRepository } from '../repositories/createOrUpdateUser.repository';

export class CreateOrUpdateUserService {
  constructor(
    private createOrUpdateUser: CreateOrUpdateUserRepository,
  ) {}

  async run(data: CreateOrUpdateUserDto, id?: number) {
    return this.createOrUpdateUser.run(data, id);
  }
}
