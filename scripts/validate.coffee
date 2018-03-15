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
    msg.send "I'll totally validate that for you, <firstname> <lastname>"
    msg.send "... later"
  robot.respond /validate ([0-9]+)$/i, (msg) ->
    if true
      msg.send "Hold on there, cowboy.  I'm currently out of order.  Ask @sshep for validation."
    else
      if msg.message.room is "C2LRCM4DN"
        ticket = msg.match[1]
        if ticket.length isnt 6
          msg.send "Hold on there, cowboy.  I need 6 digits to validate parking."
        else
          @exec = require('child_process').exec
          command = "PARKING_TICKET=#{ticket} node lib/chrome-validate-parking.js"
          msg.send "Validating parking for ticket #{ticket}..."
          @exec command, (error, stdout, stderr) ->
            if error is null
              msg.send stdout unless stdout is null
              msg.send stderr unless stderr is null
              `request.post({
                    url: 'https://slack.com/api/files.upload',
                    formData: {
                      token: robot.adapter.options.token,
                      title: "Validation Result #"+ticket,
                      filename: "validation"+ticket+".png",
                      filetype: "auto",
                      channels: msg.message.room,
                      file: fs.createReadStream('./response.png')
                    }
                  }, function (err, response){
                    if(err){
                      msg.send("Error uploading picture!");
                      msg.send(Util.inspect(err))
                      msg.send(Util.inspect(response.body))
                    }
                });`
            else
              msg.send "Error!"
              `request.post({
                    url: 'https://slack.com/api/files.upload',
                    formData: {
                      token: robot.adapter.options.token,
                      title: "Error Message for #"+ticket,
                      filename: "error"+ticket+".png",
                      filetype: "auto",
                      channels: msg.message.room,
                      file: fs.createReadStream('./response.png')
                    }
                  }, function (err, response){
                    if(err){
                      msg.send("Error uploading picture!");
                      msg.send(Util.inspect(err))
                      msg.send(Util.inspect(response.body))
                    }
                });`
              msg.send Util.inspect(err)
      else
        msg.send "Hold on there, cowboy.  I can't validate parking from here.  You should moooove over to #validate_parking"
