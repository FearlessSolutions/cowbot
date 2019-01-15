const config = require('../../config')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(config.sqliteDatabase)
const { selectUsersWithSkill } = require('../db')

if(process.argv.length != 3) {
  console.log('Please provide a string argument. example:\n\t npm run query -- javascript')
  process.exit(1)
}

const skill = process.argv[process.argv.length - 1]

db.all(selectUsersWithSkill, skill, (err, rows) => {
  if(err) { console.log(err) }
  console.log(rows.map(row => row.user_name))
})
