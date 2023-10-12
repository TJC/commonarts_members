create table members (
  id varchar(64) not null primary key,
  email_address varchar(1024) not null,
  mobile_number varchar(24) not null,
  first_name varchar(128) not null,
  family_name varchar(128) not null,
  address varchar(1024) not null,
  country varchar(3) not null,
  agreed_to_values boolean not null default false,
  application_submitted_at timestamp not null,
  membership_type varchar(32) not null,
  membership_approved_at timestamp
);

create index members_type_idx on members(membership_type);
