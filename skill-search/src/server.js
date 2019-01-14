require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3001

const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(`${__dirname}/../data/${process.env.SQLITE_DATABASE}`)

const { selectUsersWithSkill } = require('./db')

app.get('/', (req, res) => res.send('skill-search'))

app.get('/users', (req, res) => {
  const skill = req.query.skill

  db.all(selectUsersWithSkill, skill, (err, rows) => {
    if(err) { console.log(err) }
    let users = rows.map(row => row.user_name)
    res.send(users)
  })
})

app.listen(port, () => console.log(`skill-share app listening on port ${port}`))
