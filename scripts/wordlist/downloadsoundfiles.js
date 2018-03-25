// npm install `request`
const fs = require('fs-extra');
const request = require('request');
const text = 'Hello World';

let nounMap = JSON.parse(fs.readFileSync('noun_map.json'));

let lang = process.argv[2];

let dir = 'sounds/' + lang;

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

let hundred = 100;

function download(word) {

  let filename = `sounds/${lang}/${word.replace(' ', '_')}.mp3`;

  if (!fs.existsSync(filename)) {
    let r = request({
      url: `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(word)}&tl=${lang}&client=tw-ob`,
      headers: {
        'Referer': 'http://translate.google.com/',
        'User-Agent': 'stagefright/1.2 (Linux;Android 5.0)'
      }
    }, (err, res, body) => {
      if (err) console.error(err);
    })
    
    r.on('response', (resp) => {
      if (resp.statusCode === 200) {
        console.log('saving ' + filename);
        r.pipe(fs.createWriteStream(filename))
      }
    });

  } else {
    console.log(filename);
  }

}

var inputFile='words.csv';

for (let i = 0; i < nounMap.length; i++) {
  download(nounMap[i][lang])
}

