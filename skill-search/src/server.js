const config = require('../config')
const express = require('express')
const server = express()

const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(config.sqliteDatabase)

const { selectUsersWithSkill } = require('./db')

server.get('/', (req, res) => res.send('skill-search api'))

server.get('/users', (req, res) => {
  const skill = req.query.skill

  db.all(selectUsersWithSkill, skill, (err, rows) => {
    if(err) { console.log(err) }
    let users = rows.map(row => row.user_name)
    res.send(users)
  })
})

module.exports = server.listen(config.port, () => {
  let msg = `skill-search api listening on port ${config.port}`
  msg = `${msg} in ${config.environment} mode`
  console.log(msg)
})
