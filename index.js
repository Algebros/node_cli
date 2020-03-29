const { program } = require('commander');
const { pipeline, Transform } = require('stream');
const path = require('path');
const fs = require('fs');

program.storeOptionsAsProperties(false)

program
  .option('-s, --shift <number>', 'a shift')
  .option('-i, --input <path>', 'an input file')
  .option('-o, --output <path>', 'an output file')
  .option('-a, --action <string>', 'an action encode/decode')

program.parse(process.argv);

const arg = program.opts();
const pathToFile = path.join(__dirname, arg.input);

pipeline(
  (arg.input) ?
  fs.createReadStream(pathToFile)
  : process.stdin,

  new Transform({
    transform(chunk) {
      this.push(caesarCipher(chunk.toString(), arg.shift, arg.action));
    }
  }),

  (arg.output) ?
  fs.createWriteStream(path.join(__dirname, arg.output), 'utf-8')
  : process.stdout,

  (err) => console.log(err)
)

function caesarCipher(str, key, act) {
  switch (act) {
    case 'encode':
      return str.replace(/[A-Za-z]/g, c => String.fromCharCode( c.charCodeAt() + +key ));
    
    case 'decode':
      return str.replace(/[A-Za-z]/g, c => String.fromCharCode( c.charCodeAt() - +key ));
  
    default:
      break;
  }
}
