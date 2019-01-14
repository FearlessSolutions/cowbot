const cron = require('node-cron')
const { exec } = require('child_process')

// const command = 'yarn run skills:refresh'
// const dateTime = '15,45 * * * *'  // minute 15 and minute 45, every hour

const reoccurringJob = (command, dateTime) => {
  cron.schedule(dateTime, () => {
    console.log(`'${command}' is executing...`)
    exec(command, (error, stdout, stderr) => {
      if(error) {
        console.log(error)
      } else {
        console.log(`'${command}' ran successfully`)
      }
    })
  })
}

module.exports = reoccurringJob
