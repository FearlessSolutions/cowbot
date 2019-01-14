const reoccurringJob = require('./reoccurringJob')

const command = 'yarn run skills:refresh'
const dateTime = '15,45 * * * *'  // minute 15 and minute 45, every hour

reoccurringJob(command, dateTime)
