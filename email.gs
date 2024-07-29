//Send email to inform about the schedule arrangement
function Send() {
  let spreadsheet = SpreadsheetApp.openById("1ZFHOSQPd0YcUyFKrSyxvNDYbWncRaf1rvvkByND4B-Q");
  let sheet = spreadsheet.getSheetByName("Schedule");

  let lastRow = sheet.getLastRow();
  let name = sheet.getRange(lastRow, 2).getValue();
  let email = sheet.getRange(lastRow, 3).getValue();
  let start_date = sheet.getRange(lastRow, 4).getValue();
  let end_date = sheet.getRange(lastRow, 5).getValue();
  let title = sheet.getRange(lastRow, 6).getValue();
  let details = sheet.getRange(lastRow, 7).getValue();
  let answer = sheet.getRange(lastRow, 8).getValue();

  // Ensure the start_date and end_date are Date objects
  if (!(start_date instanceof Date)) {
    start_date = new Date(start_date);
  }
  if (!(end_date instanceof Date)) {
    end_date = new Date(end_date);
  }

  // Format dates
  let formattedStartDate = Utilities.formatDate(start_date, Session.getScriptTimeZone(), 'dd-MM-yyyy');
  let formattedEndDate = Utilities.formatDate(end_date, Session.getScriptTimeZone(), 'dd-MM-yyyy');

  // Construct the email body
  let body = `Dear ${name},

I hope this email finds you well.

We are pleased to inform you that you have been selected for ${title} scheduled for ${details}. Below are the details of the training:

Training Schedule:
Start Date: ${formattedStartDate}
End Date: ${formattedEndDate}
Arrangement: ${title}
Details: ${details}

Best regards,
HR Department`;

  Logger.log(name);
  // Send email if answer is "Yes"
  if (answer == "Yes") {
    GmailApp.sendEmail(email, "Selected for " + title, body);
    Logger.log("Successful");
  }
  else
    Logger.log("Unsuccessful");
}
