const config = require('../../config')
const fs = require('fs')

fs.unlink(config.sqliteDatabase, (err) => {
  if(err) throw err
})
