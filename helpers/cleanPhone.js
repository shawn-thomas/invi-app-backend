"use strict";

/**
 * Removes all formatting from phoneStr.
 *
 * Accepts a 'string': phoneStr
 *
 * Returns unformatted string without special chars.
 * examples.
 *
 * (xxx) xxx-xxxx => xxxxxxxxxx
 * (xxx)xxx-xxxx => xxxxxxxxxx
 * xxx-xxx-xxxx => xxxxxxxxxx
 * xxx xxx xxxx => xxxxxxxxxx
 */


function cleanPhone(phoneStr) {
  let formatTypes = "()-,"
  let unformattedRes = "";

  for (let char of phoneStr){
    if (char !== " " && (!formatTypes.includes(char))){
      unformattedRes += char;
    }
  }

  return unformattedRes;
}

module.exports = { cleanPhone };