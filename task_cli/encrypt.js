const CONST = require('./constants');

function encryption(char, arg) {
  let charCode = char.charCodeAt();

  switch (arg.action) {
    case 'encode':
      if (isLowCase(charCode)) {
        charCode =
          ((charCode - CONST.alphabet.startLowerCase + arg.shift) %
            CONST.alphabet.alphabetNum) +
          CONST.alphabet.startLowerCase;
      } else {
        charCode =
          ((charCode - CONST.alphabet.startUpperCase + arg.shift) %
            CONST.alphabet.alphabetNum) +
          CONST.alphabet.startUpperCase;
      }
      break;

    case 'decode':
      if (isLowCase(charCode)) {
        charCode =
          CONST.alphabet.endLowerCase -
          ((CONST.alphabet.endLowerCase - charCode + arg.shift) %
            CONST.alphabet.alphabetNum);
      } else {
        charCode =
          CONST.alphabet.endUpperCase -
          ((CONST.alphabet.endUpperCase - charCode + arg.shift) %
            CONST.alphabet.alphabetNum);
      }
      break;

    default:
      break;
  }

  return String.fromCharCode(charCode);
}

function isLowCase(charCode) {
  const isAlphabet =
    (charCode >= CONST.alphabet.startUpperCase &&
      charCode <= CONST.alphabet.endUpperCase) ||
    (charCode >= CONST.alphabet.startLowerCase &&
      charCode <= CONST.alphabet.endLowerCase);

  if (isAlphabet) {
    return (
      charCode >= CONST.alphabet.startLowerCase &&
      charCode <= CONST.alphabet.endLowerCase
    );
  }
  return false;
}

module.exports = { encryption };
