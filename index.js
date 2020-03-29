const { program } = require('commander');
const { pipeline, Transform } = require('stream');
const path = require('path');
const fs = require('fs');

program.storeOptionsAsProperties(false)

program
  .option('-s, --shift <number>', 'a shift', parseInt)
  .option('-i, --input <path>', 'an input file')
  .option('-o, --output <path>', 'an output file')
  .option('-a, --action <string>', 'an action encode/decode')
  .parse(process.argv);

const arg = program.opts();

pipeline(
  (arg.input) ?
  fs.createReadStream(path.join(__dirname, arg.input))
  : process.stdin,

  new Transform({
    transform(chunk) {
      this.push( checkAlphabet(chunk) );
    }
  }),

  (arg.output) ?
  fs.createWriteStream(path.join(__dirname, arg.output), 'utf-8')
  : process.stdout,

  (err) => console.log(err)
)

function checkAlphabet(str) {
  return str.toString().replace(/[A-Za-z]/g, (c) => encryption(c));
}

function encryption(char) {
  const startLowerCase = 97;
  const endLowerCase = 122;
  const startUpperCase = 65;
  const endUpperCase = 90;

  switch (arg.action) {
    case 'encode':
      char = char.charCodeAt() + arg.shift;
      break;
    
    case 'decode':
      char = char.charCodeAt() - arg.shift;
      break;
  
    default:
      break;
  }

  return String.fromCharCode(char);
}