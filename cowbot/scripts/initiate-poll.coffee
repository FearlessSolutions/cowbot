request = require "request"
Util = require "util"

module.exports = (robot) ->
  robot.hear /^['"]?(\/yesno)['"]?(.*)/, (msg) ->
    # TODO: Confirm sender
    console.log "initiate-poll: Username: " + msg.message.user.name.toLowerCase()
    # TODO: Confirm Channel
    console.log "initiate-poll: Room: "+ msg.message.room
    trigger_command(robot, msg.message.room, msg.match[1], msg.match[2])
trigger_command =(robot, channel, command, text) ->
  post_options =
    url: 'https://slack.com/api/chat.command'
    formData:
      token: process.env.LEGACY_TOKEN
      channel: channel
      command: command
      text: text
  request.post post_options, (err, response) ->
    if err
      console.log "initiate-poll: Error triggering command!"
      console.log Util.inspect(err)
      console.log Util.inspect(response.body)
    else
      console.log "initiate-poll: Successfully posted slash command"
      console.log Util.inspect(response.body)
