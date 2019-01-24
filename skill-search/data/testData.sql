-- sqlite3 data/skill-search.db .dump > data/testData.sql
-- then, data was manually scrubbed
PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE users(
  id integer primary key not null,
  uid text not null,
  name text,
  email text,
  display_name text,
  image_url text,
  tech_skills_csv text,
  updated_at integer not null
);
INSERT INTO users VALUES(1,'AAAAAAAAA','adelosreyes','adelosreyes@example.com','adelosreyes','https://placekitten.com/512/512?image=1','testing, C#, debugging, questioning',1544542617);
INSERT INTO users VALUES(2,'AAAAAAAAB','rdavis','rdavis@example.com','richard','https://placekitten.com/512/512?image=2','ruby, javascript, node, react, automated testing, sql',1547756906);
INSERT INTO users VALUES(3,'AAAAAAAAC','amathews','amathews@example.com','amathews','https://placekitten.com/512/512?image=3','Javascript, ExtJS, Java, MS SQL, CSS',1547504120);

CREATE TABLE skills(
  id integer primary key not null,
  name text not null
);
INSERT INTO skills VALUES(1,'testing');
INSERT INTO skills VALUES(2,'c#');
INSERT INTO skills VALUES(3,'debugging');
INSERT INTO skills VALUES(4,'questioning');
INSERT INTO skills VALUES(5,'ruby');
INSERT INTO skills VALUES(6,'javascript');
INSERT INTO skills VALUES(7,'node');
INSERT INTO skills VALUES(8,'react');
INSERT INTO skills VALUES(9,'automated testing');
INSERT INTO skills VALUES(10,'sql');
INSERT INTO skills VALUES(11,'extjs');
INSERT INTO skills VALUES(12,'java');
INSERT INTO skills VALUES(13,'ms sql');
INSERT INTO skills VALUES(14,'css');
CREATE TABLE users_skills(
  id integer primary key not null,
  user_id integer not null,
  skill_id integer not null
);
INSERT INTO users_skills VALUES(1,1,1);
INSERT INTO users_skills VALUES(2,1,2);
INSERT INTO users_skills VALUES(3,1,3);
INSERT INTO users_skills VALUES(4,1,4);
INSERT INTO users_skills VALUES(5,2,5);
INSERT INTO users_skills VALUES(6,2,6);
INSERT INTO users_skills VALUES(7,2,7);
INSERT INTO users_skills VALUES(8,2,8);
INSERT INTO users_skills VALUES(9,2,9);
INSERT INTO users_skills VALUES(10,2,10);
INSERT INTO users_skills VALUES(11,3,6);
INSERT INTO users_skills VALUES(12,3,11);
INSERT INTO users_skills VALUES(13,3,12);
INSERT INTO users_skills VALUES(14,3,13);
INSERT INTO users_skills VALUES(15,3,14);
CREATE UNIQUE INDEX index_uid_on_users on users(uid);
CREATE UNIQUE INDEX index_name_on_skills on skills(name);
COMMIT;
