import { ulid } from 'ulid';

export enum MembershipType {
    Pending = "Pending",
    RegularMember = "RegularMember",
    SpecialMember = "SpecialMember",
    RejectedMember = "Rejected"
}

export class MemberData {
    id: string; // TODO: Should be a ULID
    emailAddress: string;
    mobileNumber: string;
    firstName: string;
    familyName: string;
    address: string;
    country: string;
    agreedToValues: boolean;
    applicationSubmittedAt: Date;
    membershipType: MembershipType;
    membershipApprovedAt: Date | undefined;
}

// Similar to MemberData, but uses strings for the more complex types,
// and doesn't include the membership status, submitted-at and approved-at fields
export class CreateMemberDto {
    emailAddress: string;
    mobileNumber: string;
    firstName: string;
    familyName: string;
    address: string;
    country: string;
    agreedToValues: boolean;
}

