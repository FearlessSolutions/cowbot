fs = require('fs')

const schema = fs.readFileSync(`${__dirname}/schema.sql`, 'utf8')
const selectTechSkillsCsvs = fs.readFileSync(`${__dirname}/selectTechSkillsCsvs.sql`, 'utf8')
const selectUserUids = fs.readFileSync(`${__dirname}/selectUserUids.sql`, 'utf8')
const selectUsersWithSkill = fs.readFileSync(`${__dirname}/selectUsersWithSkill.sql`, 'utf8')
const updateUser = fs.readFileSync(`${__dirname}/updateUser.sql`, 'utf8')
const upsertUser = fs.readFileSync(`${__dirname}/upsertUser.sql`, 'utf8')

module.exports = {
  schema,
  selectTechSkillsCsvs,
  selectUserUids,
  selectUsersWithSkill,
  updateUser,
  upsertUser
}
