const { pipeline, Transform } = require('stream');
const path = require('path');
const fs = require('fs');
const { encryption } = require('./encrypt');

function init(arg) {
  pipeline(
    arg.input
      ? fs.createReadStream(path.join(__dirname, arg.input))
      : process.stdin,

    new Transform({
      transform(chunk) {
        this.push(checkAlphabet(chunk, arg));
      }
    }),

    arg.output
      ? fs.createWriteStream(path.join(__dirname, arg.output), 'utf-8')
      : process.stdout,

    err => process.stderr(err)
  );
}

function checkAlphabet(str, arg) {
  return str.toString().replace(/[A-Za-z]/g, c => encryption(c, arg));
}

module.exports = { init };
