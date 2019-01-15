require('dotenv').config()
const path = require('path')

const config = {
  port: process.env.PORT || 3001,
  slackOauthToken: process.env.SLACK_OAUTH_TOKEN,
  sqliteDatabase: path.resolve(`${__dirname}/../data/skill-search.db`),
}

Object.keys(config).forEach(key => {
  if(!config[key]) throw new Error(`Configuration Error: Value not set for ${key}`)
})

module.exports = config
