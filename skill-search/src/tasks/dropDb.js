const config = require('../../config')
const fs = require('fs')

if(fs.existsSync(config.sqliteDatabase)) {
  fs.unlink(config.sqliteDatabase, (err) => {
    if(err) throw err
  })
}
