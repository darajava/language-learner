const translate = require('google-translate-api');
const fs = require('fs-extra');

let i = 0;
if (!fs.existsSync('./noun_map.json')) {
  fs.copySync('en_only.json', 'noun_map.json')
}

let nounMap = JSON.parse(fs.readFileSync('noun_map.json'));

let numberTranslated = 0;

let toLang = process.argv[2];

let articleLangs = ['it', 'fr', 'es', 'de']

for (let i = 0; i < nounMap.length; i++) {
  if (nounMap[i][toLang]) {
    if (numberTranslated++ === nounMap.length - 1) done();
    //continue; 
  }

  translate((articleLangs.includes(toLang) ? 'the ' : '')  + nounMap[i].en, {from: 'en', to: toLang}).then(res => {
    nounMap[i][toLang] = res.text;
    done();
  }).catch(err => {
    console.error(err);
  });
}

function done() {
  fs.writeFile("./noun_map.json", JSON.stringify(nounMap, null, '  '));
}
