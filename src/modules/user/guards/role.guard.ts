import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../decorator/role.decorator'; // Import the metadata key

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler();

    // Fetch roles metadata using the correct key 'Role'
    const requiredRoles = this.reflector.get<string[]>(Role, handler);

    // If no roles are defined, allow access
    if (!requiredRoles) {
      return true;
    }

    console.log('requiredRoles =>', requiredRoles);

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming you've attached the user in previous JWT guard
    const userRoles = user?.roles || [];

    // Check if the user has the required roles
    const hasRole = () =>
      requiredRoles.some((role) => userRoles.includes(role));

    return hasRole();
  }
}
