require('dotenv').config()
const execSync = require('child_process').execSync

execSync(`sqlite3 ${__dirname}/../../data/${process.env.SQLITE_DATABASE} < ${__dirname}/../db/schema.sql`)
