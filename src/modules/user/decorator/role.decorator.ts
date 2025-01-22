import { SetMetadata } from '@nestjs/common';
import { StatusUser } from '../enum/status.enum';

export const Role = 'roles';

export const Roles = (...role: StatusUser[]) => {
  return SetMetadata(Role, role);
};
