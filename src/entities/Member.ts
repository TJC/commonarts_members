import { PrimaryKey, Index, Cascade, Collection, Entity, ManyToMany, ManyToOne, Property, BaseEntity } from '@mikro-orm/core';
import { MembershipType } from 'src/members/member.data';
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
    membershipApprovedAt?: Date;

    // TODO: Do I need a constructor?
    // constructor(emailAddress: string, mobileNumber: string, firstName: string, familyName: string, address: string, country: string, agreedValues: boolean, memberType: MembershipType, membershipApprovedAt?: Date) {
    //     this.emailAddress = emailAddress;
    //     this.mobileNumber = mobileNumber;
    //     this.firstName = firstName;
    //     this.familyName = familyName;
    //     this.address = address;
    //     this.country = country;
    //     this.agreedToValues = agreedValues;
    //     this.membershipType = memberType;
    //     this.membershipApprovedAt = membershipApprovedAt;
    // }
}