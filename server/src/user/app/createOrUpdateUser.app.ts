import { CreateOrUpdateUserDto } from '../domain/dtos/createOrUpdateUser.dto';
import { CreateOrUpdateUserService } from '../domain/services/createOrUpdateUser.service';
import { CreateOrUpdateUserMySql } from '../infra/createOrUpdateUser.mysql';

export class CreateOrUpdateUserApp {
  async run(data: CreateOrUpdateUserDto, id?: number) {
    const createOrUpdateUser = new CreateOrUpdateUserService(
      new CreateOrUpdateUserMySql(),
    );

    return createOrUpdateUser.run(data, id);
  }
}
