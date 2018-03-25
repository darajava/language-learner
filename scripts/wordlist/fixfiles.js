const lang = 'ja';
const testFolder = './sounds/' + lang;
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    const filepath = './sounds/' + lang + '/';
    fs.rename(filepath + file, filepath + decodeURIComponent(file).replace(' ', '_'), function(err) {
    if ( err ) console.log('ERROR: ' + err);
});
  });
})

