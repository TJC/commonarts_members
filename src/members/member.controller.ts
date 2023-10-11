import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CreateMemberDto, MemberData, MembershipType } from './member.data';
import { ulid } from 'ulid';
import { MembersService } from './members.service';
import { MikroORM } from '@mikro-orm/core';
import { EntityManager, EntityRepository } from '@mikro-orm/sqlite';
import { Member } from '../entities'

@Controller('member')
export class MemberController {
    constructor(
        // @InjectRepository(Member) private readonly memberRep: EntityRepository<Member>,
        private membersService: MembersService,
        private readonly orm: MikroORM,
        private readonly em: EntityManager
    ) { }

    @Post()
    createMember(@Body() createMemberDto: CreateMemberDto): string {
        // checks to see if member already exists with this email address -- if so, emails them with reminder.
        // if it's a new member, then insert into database.
        const memberId = ulid();
        return `new member created - id ${memberId}`;
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        // Finds one member -- either needs authentication, or some kind of secure (unguessable) id.
        const m = await this.em.findOne(Member, id)
        return m; // TODO 404 handling..
        // return `Found a member with id ${id}`;
    }
}
