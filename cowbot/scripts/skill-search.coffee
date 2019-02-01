request = require "request"

module.exports = (robot) ->
  robot.hear /who knows ([\w\s\.]*)\?$/i, (msg) ->
    skill = msg.match[1]
    request.get "http://skill-search:3001/users?skill=" + skill, (error, response) ->
      if(error)
        msg.send 'Error communicating with the skill-share service'
        console.log(error)
        return false

      if(response.statusCode == 404)
        msg.send '404 received when communicating with the skill-share service'
        console.log(response)
        return false

      json = JSON.parse response.body
      users = json.map (user) -> '@' + user

      if(users.length == 0)
        msg.send 'No one knows that skill, yet.'
        return false

      knowOrKnows = if users.length == 1 then ' knows ' else ' know '
      msg.send users.join(', ') + knowOrKnows + skill + '.'
      return true
