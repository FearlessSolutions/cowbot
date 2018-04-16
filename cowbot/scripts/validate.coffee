# Description:
#   Validate.
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot validate <last_six_numbers_on_ticket> - Attempts to validate parking
#
# Author:
#   brettbuddin

PROJECT_LIST =
  employee: "Employee"
  misc: "MISC"
  imars: "Project-IMARS"
  mdstate: "Project-MD State"
  sbagov: "Project-SBA.gov"
  hubzone: "Proj-SBA HUBZone"
  visitorbusdev: "Visitor-BusDev"
  visitormisc: "Visitor-Misc"
  visitorrecruiting: "Visitor-Recruiting"
  visitorvendor: "Visitor-Vendor"


projects = ""
project = for nickname, fullname of PROJECT_LIST
  projects = projects.concat "\n#{nickname}"

Util = require "util"
request = require "request"
fs = require "fs"
module.exports = (robot) ->
  robot.respond /validate help$/i, (msg) ->
    msg.send """
      Usage:
      To validate a ticket for yourself:
      `cowbot validate 000000 for me`
      To validate a ticket for someone else, either:
      `cowbot validate 000000 for <first-name> <last-name> on <PROJECT>`
      `cowbot validate 000000 for <first-name> <last-name> on <PROJECT> because some reason`
      Allowed PROJECTs:
      ```#{projects}
      ```
    """
  robot.respond /validate ([0-9]+) for me$/i, (msg) ->
    user = msg.message.user.name.toLowerCase()
    msg.send "I'll totally validate that for you, #{user}... later"
  robot.respond /validate ([0-9]+)$/i, (msg) ->
    if msg.message.room is "C2LRCM4DN"
      ticket = msg.match[1]
      if ticket.length isnt 6
        msg.send "Hold on there, cowboy.  I need 6 digits to validate parking."
      else
        user = msg.message.user.name.toLowerCase()
        msg.send "Validating parking for ticket #{ticket}... (this will take about 30 seconds)"

        request_options =
          url: "http://parking-service:3000/"
          qs:
            first_name: "cowbot"
            last_name: user
            ticket: ticket
          timeout: 60000
        request.get request_options, (error, response) ->
          response_body = JSON.parse response.body
          console.log "Response Body: #{Util.inspect response_body}"
          if error is null
            console.log "No Error!"
            if response_body.text is undefined
              msg.send "ERROR: No validation text"
            else
              msg.send response_body.text
            upload_picture(robot, msg, response_body.screenshot_file, ticket, "Validation Result for ticket #{ticket}", "validation-#{ticket}.png")
          else
            console.log "Error!"
            if response_body.text is undefined
              msg.send "ERROR, but did not receive any text response from validation service.  Will attempt to upload screenshot."
            else
              msg.send "ERROR: #{response_body.text}"
            upload_picture(robot, msg, response_body.screenshot_file, ticket, "Error Message for ticket #{ticket}", "error-#{ticket}.png")
            msg.send Util.inspect(error)
    else
      msg.send "Hold on there, cowboy.  I can't validate parking from here.  You should moooove over to #validate_parking"

upload_picture =(robot, msg, file, ticket, title, target_filename) ->
  post_options =
    url: 'https://slack.com/api/files.upload'
    formData:
      token: robot.adapter.options.token
      title: title
      filename: target_filename
      filetype: "auto"
      channels: msg.message.room
      file: fs.createReadStream(file)
  request.post post_options, (err, response) ->
    if err
      msg.send "Error uploading picture!"
      msg.send Util.inspect(err)
      msg.send Util.inspect(response.body)
    fs.unlinkSync file
