const reoccurringJob = require('./reoccurringJob')

const command = 'yarn run users:refresh'
const dateTime = '5,35 * * * *'  // minute 5 and minute 35, every hour

reoccurringJob(command, dateTime)
