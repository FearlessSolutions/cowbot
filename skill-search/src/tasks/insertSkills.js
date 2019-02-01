const config = require('../../config')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(config.sqliteDatabase)
const { selectTechSkillsCsvs } = require('../db')
let skills, sql

// clear out skills table
db.run(`delete from skills;`)

// insert skills derived from users.tech_skills_csv column
db.each(selectTechSkillsCsvs, (err, user) => {
  if(err) {
    console.log(err)
    return
  }

  skills = user.tech_skills_csv.toLowerCase().split(/,\s+/)

  skills.forEach(skill => {
    console.log(`inserting '${skill}' into skills`)
    sql = `
      insert into skills(name) values(?)
      on conflict do nothing;
    `
    db.run(sql, skill, (err) => {
      if(err) { console.log(err) }
    })
  })

}, () => {
  // console.log('done')
})
