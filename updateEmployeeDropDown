//GOOGLE FORM EMPLOYEE ID
function updateEmployeeIDDropdown() {
  // Open the Google Sheet
  var ss = SpreadsheetApp.openById("1ZFHOSQPd0YcUyFKrSyxvNDYbWncRaf1rvvkByND4B-Q");
  var profileSheet = ss.getSheetByName("Profile");

  // Get the Employee IDs from the Profile sheet
  var data = profileSheet.getRange("A2:A").getValues();
  var employeeIDs = [];
  
  for (var i = 0; i < data.length; i++) {
    var id = data[i][0];
    if (id) { // Check if the cell is not empty
      id = id.toString(); // Ensure it's a string
      // Add a leading apostrophe to the ID
      employeeIDs.push("'" + id);
    }
  }
  
  Logger.log(employeeIDs); // Log the Employee IDs to ensure they are fetched correctly

  // Open the Google Form
  var form = FormApp.openById("12YlcV5TATOJhOLG1uE5ynfMMY_N0tHw8ZWP51v4grr8"); // Replace with your Form ID
  var items = form.getItems(FormApp.ItemType.LIST);
  var found = false;
  
  for (var i = 0; i < items.length; i++) {
    var item = items[i].asListItem();
    
    Logger.log(item.getTitle()); // Log the title of each item to ensure it matches "Employee ID"
    
    if (item.getTitle() == "Employee ID") { // Replace with your question title
      item.setChoiceValues(employeeIDs);
      found = true;
      break;
    }
  }
  
  if (!found) {
    Logger.log("Employee ID question not found or is not of type Dropdown.");
  }
}

function runUpdate() {
  updateEmployeeIDDropdown();
  Logger.flush();
}
