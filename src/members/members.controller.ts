import { Controller, Post, Get } from '@nestjs/common';
import { MembershipType } from './member.data';
import { MembersService } from './members.service';
import { MikroORM, QueryOrder } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/sqlite';
import { Member } from '../entities'

@Controller('members')
export class MembersController {
    constructor(private membersService: MembersService, private readonly orm: MikroORM, private readonly em: EntityManager) { }

    @Get()
    async listMembers(): Promise<Array<Member>> {
        const memberList = await this.em.find(Member, {}, { orderBy: { applicationSubmittedAt: QueryOrder.ASC } })
        return memberList;
    }


    @Get("pending")
    async findPending(): Promise<Array<Member>> {
        // Finds members where status = Pending
        const memberList = await this.em.find(Member, { membershipType: MembershipType.Pending }, { orderBy: { applicationSubmittedAt: QueryOrder.ASC } })
        return memberList
    }

}
