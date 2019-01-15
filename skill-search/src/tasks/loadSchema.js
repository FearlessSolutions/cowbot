const config = require('../../config')
const execSync = require('child_process').execSync

execSync(`sqlite3 ${config.sqliteDatabase} < ${__dirname}/../db/schema.sql`)
