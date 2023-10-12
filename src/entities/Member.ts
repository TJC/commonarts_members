import { PrimaryKey, Index, Cascade, Collection, Entity, ManyToMany, ManyToOne, Property, BaseEntity } from '@mikro-orm/core';
import { CreateMemberDto, MembershipType } from 'src/members/member.data';
import { ulid } from 'ulid';

@Entity({ tableName: "members" })
export class Member extends BaseEntity<Member, 'id'> {
    @PrimaryKey()
    id: string = ulid();

    @Property()
    emailAddress: string;

    @Property()
    mobileNumber: string;

    @Property()
    firstName: string;

    @Property()
    familyName: string;

    @Property()
    address: string;

    @Property()
    country: string;

    @Property()
    agreedToValues: boolean = false;

    @Property()
    applicationSubmittedAt: Date = new Date();

    @Property()
    @Index()
    membershipType: string = MembershipType.Pending;

    @Property({ nullable: true })
    membershipApprovedAt?: Date = undefined;

    constructor(dto: CreateMemberDto) {
        super();
        this.emailAddress = dto.emailAddress;
        this.mobileNumber = dto.mobileNumber;
        this.firstName = dto.firstName;
        this.familyName = dto.familyName;
        this.address = dto.address;
        this.country = dto.country;
        this.agreedToValues = dto.agreedToValues;
        // Note it's missing the app submitted at and membership type fields; they will take the defaults
    }
}