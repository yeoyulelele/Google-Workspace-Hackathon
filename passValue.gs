function PassValue() {
  var formResponsesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leave Application Form');
  var destinationSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Schedule');

  // Get all data from the sheet
  var data = formResponsesSheet.getDataRange().getValues();
  
  // Find the actual last row with data by iterating from the end of the data array
  var lastRow = data.length;
  for (var i = data.length - 1; i >= 0; i--) {
    if (data[i].some(cell => cell !== "")) {
      lastRow = i + 1;
      break;
    }
  }
  
  // Logging to check the actual last row number
  Logger.log('Actual Last Row with data: ' + lastRow);
  
  // Get the data from the last form response
  var formData = data[lastRow - 1];
  
  // Logging to check the fetched data
  Logger.log('formData: ' + formData);
  
  // Check if formData is empty
  if (!formData || formData.length === 0) {
    Logger.log('No data found in the last row.');
    return;
  }
  
  // Logging to check formData[10]
  Logger.log('formData[10]: ' + formData[10]);
  
  // Define which columns you want to transfer
  var destinationData = [];
  
  // Adjust the indices to match the correct order
  if (formData[10] == "ACCEPTED") {
    destinationData[0] = formData[2] || ''; // Handle empty values
    destinationData[1] = formData[3] || '';
    destinationData[2] = formData[1] || '';
    destinationData[3] = formData[5] || '';
    destinationData[4] = formData[6] || '';
    destinationData[5] = "On Leave";
    destinationData[6] = formData[4] || '';
    destinationData[7] = "No";
    
    // Logging to check the destinationData before appending
    Logger.log('destinationData: ' + destinationData);
    
    destinationSheet.appendRow(destinationData);
  } else {
    Logger.log('No data appended: formData[10] is not ACCEPTED');
  }
}

function createTrigger() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.newTrigger('PassValue')
    .forSpreadsheet(sheet)
    .onFormSubmit()
    .create();
}
