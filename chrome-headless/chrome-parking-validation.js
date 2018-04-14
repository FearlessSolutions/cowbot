const puppeteer = require('puppeteer');
const util = require("util");

function getenv(envname){
  if(process.env[envname]) {
    return process.env[envname];
  } else {
    console.log(`FATAL: No ${envname} env given to this script`);
    process.exit(10);
  }
}

const URL = "https://validate.usa.skidata.com/15SFrederickStreet/"
const SCREENSHOT_FILE = "response.png";
const TICKET = getenv("TICKET");
const FIRST_NAME = getenv("FIRST_NAME");
const LAST_NAME = getenv("LAST_NAME");
const PROJECT = getenv("PROJECT");
const USERNAME = getenv("PARKING_USERNAME");
const PASSWORD = getenv("PARKING_PASSWORD");

const timeout = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(true);
  await page.setViewport({width: 1024, height: 768});
  await page.goto(URL, {waitUntil: 'networkidle2'});
  console.log("Page loaded, but waiting a bit extra...");
  await page.screenshot({path: SCREENSHOT_FILE});
  await timeout(5000);
  await page.screenshot({path: SCREENSHOT_FILE});
  console.log("Got page. Making sure we have #Username...");
  await page.frames()[1].waitForSelector("#Username");
  console.log("#Username loaded.  Entering login information");
  const frame = await page.frames()[1];
  const usernameElement = await frame.$("#Username");
  const passwordElement = await frame.$("#Password");
  const buttonElement = await frame.$("#buttonLogon");
  await usernameElement.click();
  await page.screenshot({path: SCREENSHOT_FILE});
  await timeout(1000);
  await page.keyboard.type(USERNAME);
  await passwordElement.click();
  await page.screenshot({path: SCREENSHOT_FILE});
  await timeout(1000);
  await page.keyboard.type(PASSWORD);
  await console.log("Entered user/pass; clicking...");
  await buttonElement.click();
  await page.screenshot({path: SCREENSHOT_FILE});
  await timeout(3000);
  //const frame_loggedin = await page.frames()[0];
  await page.screenshot({path: SCREENSHOT_FILE});
  const newValidationButton = await frame.$("#menuValidation");
  console.log("Navigating to New Validation menu...");
  await newValidationButton.click();
  await timeout(3000);
  console.log("Waiting for entry field to load...");
  await page.screenshot({path: SCREENSHOT_FILE});
  await frame.waitForSelector("#ParkingTicketNumber");
  await frame.type("#ParkingTicketNumber", TICKET);
  await page.screenshot({path: SCREENSHOT_FILE});
  await frame.click('#buttonVerify');
  console.log("Waiting for ticket to verify...");
  await page.screenshot({path: SCREENSHOT_FILE});
  try {
    await frame.waitForSelector("#itemValidationCustomField1ID");
  } catch (e) {
    console.log("ERROR: Could not validate ticket.  Please review screenshot.");
    await page.screenshot({path: SCREENSHOT_FILE});
    process.exit(10);
  }
  await frame.click("#itemValidationCustomField1ID");
  await page.screenshot({path: SCREENSHOT_FILE});
  await timeout(500);
  await page.keyboard.type(PROJECT);
  await timeout(500);
  await page.screenshot({path: SCREENSHOT_FILE});
  await page.keyboard.enter;
  await timeout(500);
  await frame.type("#VisitorFirstName", FIRST_NAME);
  await frame.type("#VisitorLastName", LAST_NAME);
  // TODO: Enable to actually validate this ticket
  await frame.click("#buttonSave");
  await timeout(2000);
  const lastTicket = await frame.$("b span b");
  const validatedTicket = await frame.evaluate(lastTicket => lastTicket.innerHTML, lastTicket);
  console.log(`Last approved ticket: ${validatedTicket}`);
  await page.screenshot({path: SCREENSHOT_FILE});
  await browser.close();

  if ( validatedTicket === TICKET ) { 
    console.log("Ticket has been approved successfully!");
  } else {
    console.log(`ERROR: Last Validated number '${validatedTicket}' does not match Requested number '${TICKET}'.  Ticket probably not validated.  Please review screenshot.`);
    process.exit(20);
  }
})();
