daysUntil = (endDate) ->
  millisecondsPerDay = 24 * 60 * 60 * 1000;
  days = Math.round((new Date(endDate) - new Date()) / millisecondsPerDay);
  return Math.max days, 0
weeksUntil = (endDate) ->
  millisecondsPerWeek = 24 * 60 * 60 * 1000 * 7;
  weeks = Math.round((new Date(endDate) - new Date()) / millisecondsPerWeek);
  return Math.max weeks, 0
babyText = (name, gender, date) ->
  if daysUntil(date) == 0
    return "#{name}'s baby #{gender} was born on #{date}!"
  else
    return "#{name}'s baby #{gender} is due on #{date}!  That's in #{daysUntil(date)} #{if daysUntil(date) == 1 then "day" else "days"}, or about #{weeksUntil(date)} #{if weeksUntil(date) == 1 then "week" else "weeks"}!"

module.exports = (robot) ->
  robot.respond /babywatch/i, (res) ->
    res.send """
      #{babyText('Rachel',   ':girl: Rose', '2019-04-17')}
      #{babyText('Bethany',  ':boy:',       '2019-07-18')}
      #{babyText('Jon King', ':boy',        '2019-07-31')}
      #{babyText('Clare',    ':girl:',      '2019-10-15')}
    """
