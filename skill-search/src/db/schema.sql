drop table if exists users;
create table users(
  id integer primary key not null,
  uid text not null,
  name text,
  tech_skills_csv text,
  updated_at integer not null
);

create unique index index_uid_on_users on users(uid);

drop table if exists skills;
create table skills(
  id integer primary key not null,
  name text not null
);

create unique index index_name_on_skills on skills(name);

drop table if exists users_skills;
create table users_skills(
  id integer primary key not null,
  user_id integer not null,
  skill_id integer not null
);
