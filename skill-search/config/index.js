require('dotenv').config()
const path = require('path')

let databaseName
const environment = process.env.NODE_ENV

if (environment !== 'production') {
  databaseName = path.resolve(`${__dirname}/../data/skill-search-${environment}.db`)
} else {
  databaseName = path.resolve(`${__dirname}/../data/skill-search.db`)
}

const config = {
  port: process.env.PORT || 3001,
  slackOauthToken: process.env.SLACK_OAUTH_TOKEN,
  sqliteDatabase: databaseName,
}

Object.keys(config).forEach(key => {
  if(!config[key]) throw new Error(`Configuration Error: Value not set for ${key}`)
})

module.exports = config
