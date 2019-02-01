const config = require('../../config')
const execSync = require('child_process').execSync
const fs = require('fs')

if(fs.existsSync(config.sqliteDatabase)) {
  console.log(`${config.sqliteDatabase} already exists`)
} else {
  execSync(`sqlite3 ${config.sqliteDatabase} < ${__dirname}/../db/schema.sql`)
}
