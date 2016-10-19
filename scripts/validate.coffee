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

Util = require "util"
request = require "request"
fs = require "fs"
module.exports = (robot) ->
  robot.respond /validate ([0-9][0-9][0-9][0-9][0-9][0-9])$/i, (msg) ->
    if msg.message.room is "C2LRCM4DN"
      ticket = msg.match[1]
      @exec = require('child_process').exec
      command = "PARKING_TICKET=#{ticket} casperjs lib/casper-validate-parking.js"
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
