
module.exports = (robot) ->
  robot.hear /\bmoo+\b/i, (msg) ->
    msg
      .http("http://cowsay.morecode.org/say")
      .query(format: 'text', message: "Moo to you too!")
      .get() (err, res, body) ->
        msg.send "```"+body+"```"
