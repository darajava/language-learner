const translate = require('google-translate-api');
const fs = require('fs');
const lineReader = require('readline').createInterface({
  input: fs.createReadStream('commonwordssmall.txt')
});

let i = 0;
let returnedJSON = [];

lineReader.on('line', (line) => {
  returnedJSON.push({
    en: line,
    index: i++,
  });
});


lineReader.on('close', () => {
  fs.writeFile("./en_only.json", JSON.stringify(returnedJSON, null, '  '), function(err) {
  });
});

