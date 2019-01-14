update users
set
  email = $email,
  tech_skills_csv = $tech_skills_csv
where
  uid = $uid;
