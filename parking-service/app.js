const express = require('express')
const app = express()
const validate_parking = require('./chrome-parking-validation.js');
const config = require("config");
const shortid = require('shortid');
const fs = require('fs');

function generate_id(req, res, next) {
  req.screenshot_file = `${config.app.screenshot_path}/${shortid.generate()}.png`
  return next();
}

app.get('/', generate_id, validate_parking, async (req, res) => {
  var code = 200;
  if (req.validated === false) {
    code = 500;
  }
  res.sendFile(req.screenshot_file, {}, function(err){
    if (err) {
      res.status(500).send("Could not send file...");
    }
    //fs.unlinkSync(req.screenshot_file);
    return;
  });
});

app.listen(3000, () => console.log('Parking validation app up on port 3000'))
