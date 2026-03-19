import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from '../entities/membership.entity';
import { UserMembership } from '../entities/user-membership.entity';
import { CreateMembershipDto, UpdateMembershipDto, CreateUserMembershipDto, UpdateUserMembershipDto } from '../dtos/membership.dto';

@Injectable()
export class MembershipsService {
    constructor(
        @InjectRepository(Membership) private membershipRepo: Repository<Membership>,
        @InjectRepository(UserMembership) private userMembershipRepo: Repository<UserMembership>,
    ) {}

    // --- Membership Plans ---
    async findAll() {
        return this.membershipRepo.find();
    }

    async findOne(id: number) {
        const membership = await this.membershipRepo.findOne({ where: { id } });
        if (!membership) {
            throw new NotFoundException(`Membership #${id} not found`);
        }
        return membership;
    }

    async create(dto: CreateMembershipDto) {
        const membership = this.membershipRepo.create(dto);
        return this.membershipRepo.save(membership);
    }

    async update(id: number, dto: UpdateMembershipDto) {
        const membership = await this.findOne(id);
        this.membershipRepo.merge(membership, dto);
        return this.membershipRepo.save(membership);
    }

    async remove(id: number) {
        const membership = await this.findOne(id);
        return this.membershipRepo.remove(membership);
    }

    // --- User Memberships (subscriptions) ---
    async findAllUserMemberships() {
        return this.userMembershipRepo.find({ relations: ['user', 'membership'] });
    }

    async findOneUserMembership(id: number) {
        const um = await this.userMembershipRepo.findOne({
            where: { id },
            relations: ['user', 'membership'],
        });
        if (!um) {
            throw new NotFoundException(`User Membership #${id} not found`);
        }
        return um;
    }

    async createUserMembership(dto: CreateUserMembershipDto) {
        const um = this.userMembershipRepo.create(dto);
        return this.userMembershipRepo.save(um);
    }

    async updateUserMembership(id: number, dto: UpdateUserMembershipDto) {
        const um = await this.findOneUserMembership(id);
        this.userMembershipRepo.merge(um, dto);
        return this.userMembershipRepo.save(um);
    }

    async removeUserMembership(id: number) {
        const um = await this.findOneUserMembership(id);
        return this.userMembershipRepo.remove(um);
    }
}
