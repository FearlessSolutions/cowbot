const config = require('../../config')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(config.sqliteDatabase)

const { upsertUser } = require('../db')

const SlackApi = require('../slack-api')
const slackApi = new SlackApi()

slackApi.fetchUsers().then((data) => {
  let count = 0

  data.forEach((user) => {
    let params = {
      $uid: user.id,
      $name: user.name,
      $updated_at: user.updated
    }

    console.log(`upserting uid: ${user.id}`)
    db.run(upsertUser, params, (err) => {
      if(err) {
        console.log(`Error upserting user`)
        console.log(`  with data: ${JSON.stringify(params, null, 2)}`)
        console.log(err)
        throw err
      } else if(count == data.length - 1) {
        console.log(`${data.length} records upserted`)
      } else {
        count++
      }
    })
  })
})
