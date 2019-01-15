const fetch = require('node-fetch')
const config = require('../../config')

class SlackApi {
  constructor(token) {
    this.baseUrl = 'https://slack.com/api'
    this.token = token || config.slackOauthToken
  }

  fetchUsers() {
    return fetch(`${this.baseUrl}/users.list`, this._options())
      .then(response => response.json())
      .then(data => data.members)
  }

  fetchUserProfile(uid) {
    return fetch(`${this.baseUrl}/users.profile.get?user=${uid}`, this._options())
      .then(response => response.json())
  }

  _options() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      }
    }
  }
}

module.exports = SlackApi
