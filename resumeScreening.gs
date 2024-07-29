let geminiKey = "INPUT KEY HERE";

function onSubmitForm(e) {
  try {
    // Check if 'e' is defined and 'namedValues' exists
    if (e && e.namedValues) {
      var submittedUrl = e.namedValues['Resume/CV'][0];
      var role = e.namedValues['Role'][0];
      var text = extractTextFromPDF(submittedUrl);
      var geminiResponse = gemini(role, text);

      console.log(role);
      console.log(text);
      console.log(geminiResponse);

      var spreadsheet = SpreadsheetApp.openById('1ZFHOSQPd0YcUyFKrSyxvNDYbWncRaf1rvvkByND4B-Q');
      var sheet = spreadsheet.getSheetByName('Jobs Applications');
      
      // Get the current row from the form submission
      var currentRow = e.range.getRow();
      
      // Set the Gemini response in column K (column index 11) of the current row
      sheet.getRange(currentRow, 11).setValue(geminiResponse);

      // Set the ID in the first column (column A) of the current row
      var idRange = sheet.getRange(currentRow, 1); // Get the range for the first column of the current row
      idRange.setValue(currentRow - 1); // Set the ID as the row number minus 1 (assuming header row is row 1)
    } else {
      throw new Error("Event object 'e' is undefined or does not contain 'namedValues'.");
    }
  } catch (error) {
    Logger.log("Error in onSubmitForm: " + error.message);
  }
}



// Function to extract text from PDF using OCR and Google Drive
function extractTextFromPDF(pdfUrl) {
  try {
    var fileId = getIdFromUrl(pdfUrl);
    var pdfDocument = DriveApp.getFileById(fileId);

    // Use OCR to convert PDF to a temporary Google Document
    var resource = {
      title: pdfDocument.getName().replace(/\.pdf$/, ''),
      mimeType: pdfDocument.getMimeType() || 'application/pdf'
    };

    // Restrict the response to include file Id and Title fields only
    var ocrResult = Drive.Files.insert(resource, pdfDocument.getBlob(), {
      ocr: true,
      ocrLanguage: 'en', 
      fields: 'id,title'
    });

    var textContent = DocumentApp.openById(ocrResult.id).getBody().getText();

    // Delete the temporary Google Document
    DriveApp.getFileById(ocrResult.id).setTrashed(true);

    //Logger.log(textContent);
    return textContent;
  } catch (error) {
    Logger.log("Error in extractTextFromPDF: " + error.message);
    return "";
  }
}


// Function for resume screenign GEMINI API
function gemini(role,text) {
  var apiKey = geminiKey;
  var apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";
  var url = apiUrl + "?key=" + apiKey;

  var headers = {
    "Content-Type": "application/json"
  };

  var requestBody = {
    "contents": [
      {
        "parts": [
          {
            "text": `Resume: ${text}\nExtract key skills listed on the CV that match the role of ${role} without using bold formatting ('**'). Determine if the job applicant is suitable for the role based on the provided resume. Provide a direct and clear assessment of suitability for the role. Short response. Point form.`
          }
        ]
      }
    ]
  };

  var options = {
    "method": "POST",
    "headers": headers,
    "payload": JSON.stringify(requestBody),
    "muteHttpExceptions": true // Capture the full response in case of error
  };

  // Retry mechanism
  for (var i = 0; i < 3; i++) {
    try {
      var response = UrlFetchApp.fetch(url, options);
      if (response.getResponseCode() === 200) {
        var data = JSON.parse(response.getContentText());
        var generatedText = data.candidates[0].content.parts[0].text;
        return generatedText;
      } else {
        Logger.log("Error in gemini: " + response.getContentText());
      }
    } catch (error) {
      Logger.log("Retry " + (i + 1) + " failed: " + error.message);
    }
    Utilities.sleep(2000); // Wait 2 seconds before retrying
  }

  throw new Error("Failed to get a valid response from Gemini API after 3 attempts.");
}


// Function to extract file ID from URL
function getIdFromUrl(url) {
  var match = /[-\w]{25,}/.exec(url);
  if (match) {
    return match[0];
  } else {
    throw new Error("File ID not found in the URL provided.");
  }
}


