import { Injectable } from '@nestjs/common';
import { MemberData, MembershipType } from './member.data';
import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/sqlite';

@Injectable()
export class MembersService {
    constructor(private readonly orm: MikroORM, private readonly em: EntityManager) { }

    insert(member: MemberData) {
        // TODO
    }

    findOne(id: string): MemberData | undefined {
        // TODO
        return undefined;
    }

    findPending(): Array<MemberData> {
        return [];
    }
}