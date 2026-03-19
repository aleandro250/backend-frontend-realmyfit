import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/membership.entity';
import { UserMembership } from './entities/user-membership.entity';
import { MembershipsService } from './services/memberships.service';
import { MembershipsController } from './controllers/memberships.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Membership, UserMembership])],
    providers: [MembershipsService],
    controllers: [MembershipsController],
    exports: [MembershipsService],
})
export class MembershipsModule {}
