import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users/services/users/users.service';
import { RolesService } from './roles/services/roles.service';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  @Post()
  async seed() {
    // 1. Create Roles if they don't exist
    let adminRole = await this.rolesService.findByName('ADMIN');
    if (!adminRole) {
      adminRole = await this.rolesService.create({ name: 'ADMIN' });
    }

    let userRole = await this.rolesService.findByName('USER');
    if (!userRole) {
      userRole = await this.rolesService.create({ name: 'USER' });
    }

    // 2. Create Admin User
    try {
      await this.usersService.findByEmail('admin@realmyfit.com');
      return { message: 'Database already seeded' };
    } catch (e) {
      await this.usersService.create({
        email: 'admin@realmyfit.com',
        password: 'admin', // Very simple for now
        name: 'Administrador',
        lastName: 'System',
        docType: 'ID',
        docNumber: '0000',
        isActive: true,
        roleIds: [adminRole.id],
      });
      return { message: 'Database seeded successfully' };
    }
  }
}
