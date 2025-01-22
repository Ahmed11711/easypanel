import { SetMetadata } from '@nestjs/common';
import { PermissionUser } from '../enum/role.enum';

export const Permission = 'permissions';

export const permissions = (...permissions: PermissionUser[]) => {
  return SetMetadata(Permission, permissions);
};
