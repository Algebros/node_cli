const { program } = require('commander');
const { init } = require('./init');

program.storeOptionsAsProperties(false);

program
  .option('-s, --shift <number>', 'a shift', parseInt)
  .option('-i, --input <path>', 'an input file')
  .option('-o, --output <path>', 'an output file')
  .option('-a, --action <string>', 'an action encode/decode')
  .parse(process.argv);

init(program.opts());
