const config = require('../../config')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(config.sqliteDatabase)
const { selectTechSkillsCsvs } = require('../db')
let skills, sql

// clear out users_skills table
db.run(`delete from users_skills;`)

// insert data into users_skills join table
db.each(selectTechSkillsCsvs, (err, user) => {
  if(err) { console.log(err); return }

  skills = user.tech_skills_csv.toLowerCase().split(/,\s+/)

  skills.forEach(skill => {
    sql = `select id from skills where name = ?;`
    db.get(sql, skill, (err, row) => {
      if(err) { console.log(err); return }
      if(!row.id) { console.log(`no record found for '${skill}'`); return }

      console.log(`associating uid ${user.uid} with '${skill}' skill`)
      sql = `insert into users_skills(user_id, skill_id) values (?, ?);`
      db.run(sql, [user.id, row.id])
    })
  })

}, () => {
  // console.log('done')
})
