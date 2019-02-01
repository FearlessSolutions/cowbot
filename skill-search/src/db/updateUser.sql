update users
set
  tech_skills_csv = $tech_skills_csv
where
  uid = $uid;
