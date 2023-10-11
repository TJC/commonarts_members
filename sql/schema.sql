create table members (
  id varchar(64) not null primary key,
  emailAddress varchar(1024) not null,
  mobileNumber varchar(24) not null,
  firstName varchar(128) not null,
  familyName varchar(128) not null,
  address varchar(1024) not null,
  country varchar(3) not null,
  agreedToValues boolean not null default false,
  applicationSubmittedAt timestamp not null,
  membershipType varchar(32) not null,
  membershipApprovedAt timestamp
);

create index members_type_idx on members(membershipType);

insert into members (id, emailAddress, mobileNumber, firstName, familyName, address, country, agreedToValues, applicationSubmittedAt, membershipType) values (
  '01HCEYDXEAJ560E4D1Z0JYCZ1J',
  'toby@example.com',
  '+61 400 123 456',
  'Toby',
  'Exampler',
  '123 Example Road, brunswick',
  'AU',
  true,
  '2023-09-12',
  'Pending'
);
