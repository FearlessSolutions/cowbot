const reoccurringJob = require('./reoccurringJob')

const command = 'yarn data:refresh'
const dateTime = '5,20,35,50 * * * *'  // every 15 minutes

reoccurringJob(command, dateTime)
