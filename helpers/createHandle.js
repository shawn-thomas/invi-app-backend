"use strict";

/**
 * Converts a given string into a handle format by replacing spaces with hyphens,
 * ensuring consecutive spaces are handled appropriately.
 *
 * @param {string} input - The input string to be converted into a handle.
 * @returns {string} - The resulting handle format of the input string.
 *
 * @example
 * "Samson  Trucking" => "samson-trucking"
 */


function createHandle(input) {
  let result = "";
  let previousCharWasSpace = false;

  for (let char of input) {
    if (char !== " ") {
      result += char.toLowerCase();
      previousCharWasSpace = false;
    } else if (!previousCharWasSpace) {
      result += "-";
      previousCharWasSpace = true;
    }
  }

  return result;
}

module.exports = { createHandle }