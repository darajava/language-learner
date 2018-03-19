// npm install `request`
const fs = require('fs');
const request = require('request');
const text = 'Hello World';
var parse = require('csv-parse');
var async = require('async');

function download(line) {
  console.log(line);

  if (!line.length) return;

  if (!fs.existsSync(`sounds/en/${encodeURIComponent(line[0])}.mp3`)) {
    request({
      url: `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(line[0])}&tl=en&client=tw-ob`,
      headers: {
        'Referer': 'http://translate.google.com/',
        'User-Agent': 'stagefright/1.2 (Linux;Android 5.0)'
      }
    }).pipe(fs.createWriteStream(`sounds/en/${encodeURIComponent(line[0])}.mp3`))
    console.log('saving ' + `sounds/en/${encodeURIComponent(line[0])}.mp3`);
  }

  
  if (!fs.existsSync(`sounds/de/${encodeURIComponent(line[1])}.mp3`)) {
    request({
      url: `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(line[1])}&tl=de&client=tw-ob`,
      headers: {
        'Referer': 'http://translate.google.com/',
        'User-Agent': 'stagefright/1.2 (Linux;Android 5.0)'
      }
    }).pipe(fs.createWriteStream(`sounds/de/${encodeURIComponent(line[1])}.mp3`))
    console.log('saving ' + `sounds/de/${encodeURIComponent(line[1])}.mp3`);
  }

}

var inputFile='words.csv';

var parser = parse({delimiter: ','}, function (err, data) {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    // do something with the line
    download(data[i])
  }
});
fs.createReadStream(inputFile).pipe(parser);
