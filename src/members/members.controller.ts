import { Controller, Post, Put, Get, Body, Res } from '@nestjs/common';
import { MembershipType } from './member.data';
import { MembersService } from './members.service';
import { MikroORM, QueryOrder } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/sqlite';
import { Member } from '../entities'
import { Response } from 'express';

@Controller('members')
export class MembersController {
    constructor(private membersService: MembersService, private readonly orm: MikroORM, private readonly em: EntityManager) { }

    @Get("approved")
    async listMembers(): Promise<Array<Member>> {
        const memberList = await this.em.find(Member, {
            membershipType: [MembershipType.RegularMember, MembershipType.SpecialMember]
        }, { orderBy: { applicationSubmittedAt: QueryOrder.ASC } });
        return memberList;
    }


    @Get("pending")
    async findPending(): Promise<Array<Member>> {
        // Finds members where status = Pending
        const memberList = await this.em.find(Member, { membershipType: MembershipType.Pending }, { orderBy: { applicationSubmittedAt: QueryOrder.ASC } });
        return memberList;
    }

    // Approve membership applications
    // Note that at the moment this is pretty simple; doesn't really handle any error conditions
    @Put("approve")
    async approveMembers(@Body() memberIds: Array<string>, @Res({ passthrough: true }) response: Response) {
        // Takes an array of member ids to approve
        if (memberIds.length == 0) {
            response.status(400);
            return { error: "No members selected" };
        }

        // await Promise.all(memberIds.map(id => this.approve(id)));

        for await (const id of memberIds) {
            await this.approve(id);
        }

        return { "success": true };
    }

    // Reject members permanently!
    @Put("reject")
    async rejectMembers(@Body() memberIds: Array<String>) {
        // TODO
        return "Not yet implemented"
    }

    async approve(memberId: string) {
        console.log(`Approving member id ${memberId}`)
        var member = await this.em.findOne(Member, { "id": memberId, "membershipType": MembershipType.Pending });
        if (member == undefined) {
            console.log(`member id ${memberId} was not valid`);
        }
        else {
            member.membershipType = MembershipType.RegularMember;
            member.membershipApprovedAt = new Date();
            // TODO: Also update Mailchimp etc
            console.log(`Successfully approved member id ${memberId}: ${member.emailAddress}`);

        }
        // Potentially you'd call flush() at the end of approveMembers() instead
        await this.em.flush();
    }
}
