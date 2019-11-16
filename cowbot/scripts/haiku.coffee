haiku = require('haiku-detect')
util = require('util')
module.exports = (robot) ->
  robot.hear /^.{33,250}$/g, (res) ->
    msg = res.message.text.replace(/^cowbot /,"")
    formatted_haiku = haiku.format(msg)
    console.log(util.inspect(formatted_haiku));
    if formatted_haiku.length == 3
      res.send "```#{formatted_haiku[0]}\n#{formatted_haiku[1]}\n#{formatted_haiku[2]}```"
