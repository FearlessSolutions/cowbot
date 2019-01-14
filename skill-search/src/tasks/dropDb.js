require('dotenv').config()
const fs = require('fs')

fs.unlink(`${__dirname}/../../data/${process.env.SQLITE_DATABASE}`, (err) => {
  if(err) throw err
})
