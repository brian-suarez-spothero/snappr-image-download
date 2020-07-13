// Global Variables

var n=0;

  // Create folder in 'snappr-photo-download'
  var dir = DriveApp.getFolderById('16q9Vs4TBp80r-n6PGNXrn3q_zpO4Rcyh');
  var newFolder = Date.now()+"-"+Session.getEffectiveUser().getUsername();
  dir.createFolder(newFolder);

// Function to prevent Exceeding the Maximum Execution Time Limit for Google App Scripts
function isTimeUp_(start) {
  var now = new Date();
  return now.getTime() - start.getTime() > 300000; // 5 minutes
  //return now.getTime() - start.getTime() > 9000;
}

function downloadImages() {
  // Creates a new spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSheet();
  var start = new Date();

  // Figure out the last row of data
  var lr = spreadsheet.getLastRow();
  var count = spreadsheet.getRange("A2:B"+lr+"").getValues();

  // For loop to iterate sheet data
  for (x=0; x<count.length; x++){
    
    // conditional statement for isTimeUp function
    if (isTimeUp_(start)) {
      Logger.log("Time up");
      Logger.log("Stopped at cell "+(x-1));
      break;
    }
    else
    var shift = count[x];
    // Variables from sheet data
    //
    // Gets the filename from A column
    var filename = shift[0];
    // Gets the URL from the B column
    var url = shift[1];
  
  // Downloads images from the spreadsheet to the 'newFolder'
    options = {muteHttpExceptions: true};
    var response = UrlFetchApp.fetch(url,options);
    var file = response.getBlob().setName(filename);
    DriveApp.getFoldersByName(newFolder).next().createFile(file);
    Logger.log(filename);
    Logger.log(new Date().getTime() - start.getTime());
    Logger.log(response.getContentText());
}
  
  // Sends completion email
  Logger.log(DriveApp.getFoldersByName(newFolder).next().getId());
  MailApp.sendEmail(
    Session.getEffectiveUser().getEmail(), 
    
    "Your photos have been downloaded to Google Drive", 
    
    "The process ended at cell "+x+". Please click this link to see your photos "+"https://drive.google.com/drive/folders/"+DriveApp.getFoldersByName(newFolder).next().getId()
    )
}
