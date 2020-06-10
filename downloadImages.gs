// Global Variables

  // Creates a new spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSheet();

  // Figure out the last row of data
  var lr = spreadsheet.getLastRow();
  var count = spreadsheet.getRange("A2:B"+lr+"").getValues();

  // Create folder
  var newFolder = spreadsheet.getRange('C1').getValue();

  // For loop to iterate sheet data
  for (x=0; x<count.length; x++){
    var shift = count[x];
    
    // Variables from sheet data
    //
    // Gets the filename from A column
    var filename = shift[0];
    // Gets the URL from the B column
    var url = shift[1];
  }

// Function that downloads images from the spreadsheet
function downloadImages() {
  var response = UrlFetchApp.fetch(url);
  var file = response.getBlob().getAs('image/jpeg').setName(filename);
  DriveApp.createFolder(newFolder);
  DriveApp.getRootFolder().createFile(file);
  Logger.log(filename);
  Logger.log(DriveApp.getRootFolder());
}
