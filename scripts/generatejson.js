const translate = require('google-translate-api');
const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('commonwordssmall.txt')
});

let i = 0;
let returnedJSON = [];

lineReader.on('line', (line) => {
  returnedJSON.push({
    en: line,
    index: i++,
  });
});

let numberTranslated = 0;


lineReader.on('close', () => {
  for (let i = 0; i < returnedJSON.length; i++) {
    translate('the ' + returnedJSON[i].en, {from: 'en', to: 'de'}).then(res => {
      returnedJSON[i].de = res.text;
      if (numberTranslated++ === returnedJSON.length - 1) done();
    }).catch(err => {
      console.error(err);
    });
  }
});

function done() {
  console.log(returnedJSON)
}
