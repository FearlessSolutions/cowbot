select
  users.id as user_id,
  users.name as user_name,
  users.display_name as user_display_name,
  skills.name as skill_name
from users
join users_skills on users.id = users_skills.user_id
join skills on skills.id = users_skills.skill_id
where skills.name = ? collate nocase;
