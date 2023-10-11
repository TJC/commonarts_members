import { Controller, Post, Get } from '@nestjs/common';
import { MemberData, MembershipType } from './member.data';
import { ulid } from 'ulid';
import { MembersService } from './members.service';
import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/sqlite';


@Controller('members')
export class MembersController {
    constructor(private membersService: MembersService, private readonly orm: MikroORM, private readonly em: EntityManager) { }

    @Get()
    listMembers(): Array<MemberData> {
        const exampleMember: MemberData = {
            id: ulid(),
            emailAddress: "toby@example.com",
            mobileNumber: "+61 400 123 456",
            firstName: "Toby",
            familyName: "Wintermute",
            address: '123 Example Road, Brunswick, 3055',
            country: 'Australia',
            agreedToValues: true,
            applicationSubmittedAt: new Date("2020-01-02"),
            membershipType: MembershipType.Pending,
            membershipApprovedAt: undefined
        }
        const memberList = [exampleMember];
        return memberList;
    }


    @Get("pending")
    findPending() {
        // Finds members where status = NonMember
        return this.membersService.findPending();
    }

}
