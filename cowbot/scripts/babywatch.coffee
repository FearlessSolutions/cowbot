daysUntil = (endDate) ->
  millisecondsPerDay = 24 * 60 * 60 * 1000;
  days = Math.round((new Date(endDate) - new Date()) / millisecondsPerDay);
  return Math.max days, 0
weeksUntil = (endDate) ->
  millisecondsPerWeek = 24 * 60 * 60 * 1000 * 7;
  weeks = Math.round((new Date(endDate) - new Date()) / millisecondsPerWeek);
  return Math.max weeks, 0
babyText = (name, date) ->
  if daysUntil(date) == 0
    return "#{name}'s baby was due on #{date}!"
  else
    return "#{name}'s baby is due on #{date}!  That's in #{daysUntil(date)} #{if daysUntil(date) == 1 then "day" else "days"}, or about #{weeksUntil(date)} #{if weeksUntil(date) == 1 then "week" else "weeks"}!"

module.exports = (robot) ->
  robot.respond /babywatch/i, (res) ->
    res.send """
      #{babyText('Rachel',   '2019-04-22')}
      #{babyText('Bethany',  '2019-07-18')}
      #{babyText('Jon King', '2019-07-31')}
      #{babyText('Clare',    '2019-10-15')}
    """
