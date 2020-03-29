const { program } = require('commander');
const { pipeline, Transform } = require('stream');
const path = require('path');
const fs = require('fs');
const CONST = require('./constants');

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
  let charCode = char.charCodeAt();

  switch (arg.action) {
    case 'encode':
        if (isLowCase(charCode)) {
          charCode = ((charCode - CONST.alphabet.startLowerCase + arg.shift) % CONST.alphabet.alphabetNum) + CONST.alphabet.startLowerCase;
          
        } else {
          charCode = ((charCode - CONST.alphabet.startUpperCase + arg.shift) % CONST.alphabet.alphabetNum) + CONST.alphabet.startUpperCase;
        }
      break;
    
    case 'decode':
        if (isLowCase(charCode)) {
          charCode = CONST.alphabet.endLowerCase - ((CONST.alphabet.endLowerCase - charCode + arg.shift) % CONST.alphabet.alphabetNum);
          
        } else {
          charCode = CONST.alphabet.endUpperCase - ((CONST.alphabet.endUpperCase - charCode + arg.shift) % CONST.alphabet.alphabetNum) ;
        }
      break;
  
    default:
      break;
  }

  return String.fromCharCode(charCode);
}

function isLowCase(charCode) {
  const isAlphabet = (charCode >= CONST.alphabet.startUpperCase) 
  && (charCode <= CONST.alphabet.endUpperCase)
  || (charCode >= CONST.alphabet.startLowerCase)
  && (charCode <= CONST.alphabet.endLowerCase);

  if(isAlphabet) return (charCode >= CONST.alphabet.startLowerCase) && (charCode <= CONST.alphabet.endLowerCase);
  return false;
}