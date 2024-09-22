const app = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1L24oRRbMDrZ4bnh3ps6Yz4yuLJVLcpR8mD5dXykewI8/edit?gid=0#gid=0");
const sheet = app.getSheetByName("data");

function doGet(req){
  let data = sheet.getDataRange().getValues();
  data.shift();

  let filterData;

  if(req.parameter.id) {
    filterData = data.filter(item => item[1].toString().toLowerCase() === req.parameter.id.toString().toLowerCase());
  } else {
    filterData = data
  }

  let obj = {
    tx:filterData
  }

  return ContentService.createTextOutput(JSON.stringify(obj))

}

const doPost = (request = {}) => {
  const { parameter, postData: { contents, type } = {} } = request;

  const jsonData = JSON.parse(contents);
  var row = [jsonData[0], jsonData[1], jsonData[2], jsonData[3], jsonData[4], jsonData[5]];
  sheet.appendRow(row);

  return ContentService.createTextOutput('data received');
};
