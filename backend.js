// Replace with the name of your Google Sheet
const SHEET_NAME = 'Attendees'; 
// Replace with your Google Sheet ID
const SHEET_ID = '1GK62XND6tWb-fR7lK8CmEzmYwDdPmbp6AO2clXSTFA4';

/**
 * Handle GET requests
 */
function doGet(e) {
  const response = {
    status: 'success',
    message: 'Google Apps Script is running correctly. Ready to receive POST requests.',
    method: 'GET',
    timestamp: new Date().toISOString(),
    version: '2.0'
  };
  
  return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle POST requests
 */
function doPost(e) {
  try {
    Logger.log('POST request received');
    Logger.log('Request parameters: ' + JSON.stringify(e.parameter));
    Logger.log('Request postData: ' + JSON.stringify(e.postData));
    
    const response = handleRegistration(e);
    

      return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    
    const errorResponse = {
      status: 'error',
      message: error.toString(),
      timestamp: new Date().toISOString()
    };
    

      return ContentService
        .createTextOutput(JSON.stringify(errorResponse))
        .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle registration data
 */
function handleRegistration(e) {
  try {
    // Parse POST data
    let requestData = {};
    
    if (e.postData && e.postData.contents) {
      requestData = JSON.parse(e.postData.contents);
    } else {
      throw new Error('No POST data received');
    }
    
    Logger.log('Parsed registration data: ' + JSON.stringify(requestData));
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    for (let field of requiredFields) {
      if (!requestData[field] || !requestData[field].trim()) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Open the Google Sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error(`Sheet with name "${SHEET_NAME}" not found in spreadsheet`);
    }
    
    // Extract and clean data
    const {
      firstName = '',
      lastName = '',
      phone = '',
      email = '',
      gender = '',
      membershipStatus = '',
      shirtSize = '',
      organization = '',
      package: packageType = ''
    } = requestData;
    
    // Prepare row data
    const timestamp = new Date();
    const newRow = [
      timestamp,
      firstName.toString().trim(),
      lastName.toString().trim(),
      phone.toString().trim(),
      email.toString().trim(),
      gender.toString().trim(),
      membershipStatus.toString().trim(),
      shirtSize.toString().trim(),
      organization.toString().trim(),
      packageType.toString().trim()
    ];
    
    Logger.log('Appending row: ' + JSON.stringify(newRow));
    
    // Append to sheet
    sheet.appendRow(newRow);
    
    Logger.log('Data successfully appended to sheet');
    
    return {
      status: 'success',
      message: 'Registration data successfully saved to Google Sheets',
      timestamp: timestamp.toISOString(),
      data: {
        name: `${firstName} ${lastName}`,
        email: email
      }
    };
    
  } catch (error) {
    Logger.log('Error in handleRegistration: ' + error.toString());
    throw error; // Re-throw to be caught by main handler
  }
}