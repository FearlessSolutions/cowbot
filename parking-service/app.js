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
  response = {
    text: req.validation_text,
    screenshot_file: req.screenshot_file,
    validated: req.validated
  };
  res.setHeader('Content-Type', 'application/json');
  res.status(code).send(JSON.stringify(response));
});

app.listen(3000, () => console.log('Parking validation app up on port 3000'))
