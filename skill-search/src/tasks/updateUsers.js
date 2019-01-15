const config = require('../../config')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database(config.sqliteDatabase)
const { selectUserUids, updateUser } = require('../db')
const SlackApi = require('../slack-api')
const slackApi = new SlackApi()

const selectUids = () => {
  return new Promise((resolve, reject) => {
    let result = []
    db.each(selectUserUids, (err, row) => {
      if(err) { reject(err) }
      result.push(row.uid)
    }, () => {
      resolve(result)
    })
  })
}

const updateUserProfileFromApi = (uid) => {
  slackApi.fetchUserProfile(uid).then(user => {
    // 'XfEHF6PY3S' is the custom profile object property for 'Tech Skills'
    let techSkillsCsv = user.profile.fields &&
      user.profile.fields.XfEHF6PY3S &&
      user.profile.fields.XfEHF6PY3S.value ||
      null

    let params = {
      $uid: uid,
      $email: user.profile.email || null,
      $tech_skills_csv: techSkillsCsv
    }

    console.log(`updating uid: ${uid}`)
    db.run(updateUser, params, (err) => {
      if(!err) { return }
      console.log(`Error upserting uid: ${uid}`)
      console.log(`  with data: ${user}`)
      console.log(err)
    })
  })
}

selectUids().then(uids => {
  uids.forEach(uid => {
    // Slack user.profile.get -> Tier 4 (100+ req/min rate limit)
    setTimeout(() => updateUserProfileFromApi(uid), Math.random() * 10 * 60 * uids.length)
  })
})
