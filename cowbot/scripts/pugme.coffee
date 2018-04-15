# Description:
#   Pugme is the most important thing in life
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot pug me - Receive a pug

module.exports = (robot) ->

  robot.respond /pug me/i, (msg) ->
    if msg.message.user.name.toLowerCase() != "chogan"
     msg.http("http://pugme.herokuapp.com/random")
       .get() (err, res, body) ->
         msg.send JSON.parse(body).pug

  robot.respond /how many pugs are there/i, (msg) ->
    msg.http("http://pugme.herokuapp.com/count")
      .get() (err, res, body) ->
        msg.send "THERE! ARE! #{JSON.parse(body).pug_count}! PUGS!"

