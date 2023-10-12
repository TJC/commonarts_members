import { Controller, Post, Get, Body, Param, Res } from '@nestjs/common';
import { CreateMemberDto } from './member.data';
import { MembersService } from './members.service';
import { MikroORM } from '@mikro-orm/core';
import { EntityManager, EntityRepository } from '@mikro-orm/sqlite';
import { Member } from '../entities'
import { Response } from 'express';

@Controller('member')
export class MemberController {
    constructor(
        // @InjectRepository(Member) private readonly memberRep: EntityRepository<Member>,
        private membersService: MembersService,
        private readonly orm: MikroORM,
        private readonly em: EntityManager
    ) { }

    @Post()
    async createMember(@Body() createMemberDto: CreateMemberDto) {
        // checks to see if member already exists with this email address -- if so, emails them with reminder.
        // if it's a new member, then insert into database.
        // const memberId = ulid();
        // this.em.create(Member, {
        const m = new Member({
            emailAddress: createMemberDto.emailAddress,
            mobileNumber: createMemberDto.mobileNumber,
            firstName: createMemberDto.firstName,
            familyName: createMemberDto.familyName,
            address: createMemberDto.address,
            country: createMemberDto.country,
            agreedToValues: createMemberDto.agreedToValues,
        });
        await this.em.persistAndFlush(m);
        return { "member": { "id": m.id } };
    }

    @Get(":id")
    async findOne(@Param("id") id: string, @Res({ passthrough: true }) response: Response) {
        // Finds one member -- either needs authentication, or some kind of secure (unguessable) id.
        const m = await this.em.findOne(Member, id)
        if (m == undefined) {
            response.status(404);
            return { error: `member id ${id} not found` };
        }
        return m;
    }
}
