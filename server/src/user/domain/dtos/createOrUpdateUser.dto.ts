import { UserModel } from '../../../shared/domain/models/user.model';

export interface CreateOrUpdateUserDto {
  user: UserModel;
}
