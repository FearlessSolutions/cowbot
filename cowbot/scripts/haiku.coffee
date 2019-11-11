haiku = require('haiku-detect')
module.exports = (robot) ->
  robot.hear /^.{33,250}$/g, (res) ->
    formatted_haiku = haiku.format(res.message)
    if formatted_haiku.length == 3
      res.send "```#{formatted_haiku[0]}\n#{formatted_haiku[1]}\n#{formatted_haiku[2]}```"
