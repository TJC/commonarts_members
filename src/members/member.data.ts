import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export enum MembershipType {
    Pending = "Pending",
    RegularMember = "RegularMember",
    SpecialMember = "SpecialMember",
    RejectedMember = "Rejected"
}

// Similar to MemberData, but uses strings for the more complex types,
// and doesn't include the membership status, submitted-at and approved-at fields
export class CreateMemberDto {
    @IsEmail()
    @IsNotEmpty()
    emailAddress: string;

    @IsNotEmpty()
    mobileNumber: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    familyName: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    country: string;

    @IsDefined()
    agreedToValues: boolean;
}

