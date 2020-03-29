# Node Caesar Cipher CLI

## Installing
`git clone https://github.com/Algebros/node_cli.git`

`npm install`

## Running
`node index.js`

Examples:

`node index.js -i text.txt -o encode.txt -s 3 -a encode`

`node index.js --input text.txt --output encode.txt --shift 3 --action encode`

`node index.js -i encode.txt -o decode.txt -s 3 -a decode`

## Options
1. -s, --shift: a shift
2. -i, --input: an input file
3. -o, --output: an output file
4. -a, --action: an action encode/decode