const config = require('../config')
const fs = require('fs')
const execSync = require('child_process').execSync

const create = () => {
  execSync(`sqlite3 ${config.sqliteDatabase} < ${__dirname}/testData.sql`)
}

const destroy = () => {
  fs.unlink(config.sqliteDatabase, (err) => {
    if(err) throw err
  })
}

module.exports = {
  create,
  destroy
}
