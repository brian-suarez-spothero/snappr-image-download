// Global Variables

  // Creates a new spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSheet();

  // Figure out the last row of data
  var lr = spreadsheet.getLastRow();
  var count = spreadsheet.getRange("A2:B"+lr+"").getValues();

  // For loop to iterate sheet data
  for (x=0; x<count.length; x++){
    var shift = count[x];
    
    // Variables from sheet data
    //
    // Gets the URL from the B column
    var url = shift[1];
    //
    // Gets the filename from A column
    var filename = shift[2];
  }

function downloadImages() {
  var response = UrlFetchApp.fetch(url);
  var file = response.getBlob().getAs('image/jpeg');
  DriveApp.createFile(file);
  Logger.log(filename);
}
