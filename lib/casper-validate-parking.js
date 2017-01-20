var casper = require('casper').create({viewportSize: {width: 1000, height: 400}});
//var casper = require('casper').create({viewportSize: {width: 1000, height: 400}, verbose: true, logLevel: "debug"});
var system = require('system'); 

var un = system.env.PARKING_USERNAME;
var pw = system.env.PARKING_PASSWORD;
var domain = system.env.PARKING_URL;
var ticket = system.env.PARKING_TICKET;

if( un == null || pw == null || domain == null || ticket == null ){
  console.log("Cannot get environment variables");
  exit(-1);
}

var newLoginLink = domain + "?cmd=ezflo.logon%3blogon";
var newValidationLink = domain + "?cmd=ezflo.Validation.Add.Add";

casper.start(newLoginLink).waitForSelector("#mainform", function(){
  this.sendKeys('#ctrlView_fld\\.logon_user_name', un);
  this.sendKeys('#ctrlView_fld\\.logon_password', pw);
  this.capture('response.png');
  this.click('#ctrlView_btn\\.login');
}).waitForText("MY ACCOUNT", function(){
  this.capture('response.png');
});
casper.thenOpen(newValidationLink, function(){

  // Calculate balance
  var current_balance_matcher = /Current Balance:([0-9\.]+)/
  var threshold_balance_matcher = /Threshold:([0-9\.]+)/
  var skidata_message = this.getHTML('#msg');
  if(skidata_message.match(current_balance_matcher)){
    var current_balance = parseFloat(skidata_message.match(current_balance_matcher)[1]);
    var threshold_balance = parseFloat(skidata_message.match(threshold_balance_matcher)[1]);
    if(current_balance < threshold_balance){
      this.echo("CRITICAL: Insufficient funds for validation!", 'ERROR');
    } else {
      var remaining_tickets = Math.ceil((current_balance - threshold_balance)/18);
      if (remaining_tickets <= 5){
        this.echo("WARNING: only "+remaining_tickets+" full-price validations remain. @sshep");
      }
    }
  } else {
    this.echo("WARNING: Could not determine current balance.");
  }

  // Submit ticket
  this.sendKeys('#ctrlView_fld\\.Validation\\.ParkingTicketNumber', ticket);
  this.capture('response.png');
  this.click('#ctrlView_btn\\.Validation\\.OneClick');
}).waitForText(ticket, function(){
  this.capture('response.png');
});

casper.run();
