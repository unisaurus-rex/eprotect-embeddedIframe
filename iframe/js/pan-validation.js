/**
 * @file pan-validation-js
 * pure validation functions for the PAN Input field
 */


/*
 * Validations:
 * 1) Account Number not Mod 10 (Luhn Algorithm)
 * 2) Account Number too short
 * 3) Account Number too long
 * 4) Account Number not numeric
 */

// Length constants 
var MIN_LENGTH = 13;
var MAX_LENGTH = 19;

/***** Validation Helpers *****/
// NOTE: As these are helpers they assume that the pan input is a string, and the string length > 0 

/**
 * Implementation of the Luhn Algorithm
 * See https://en.wikipedia.org/wiki/Luhn_algorithm for a reference
 * @function mod10 
 * @returns {Boolean} return true if the pan passes the mod10 check
 */
function isMod10(pan) {
  // make sure pan isn't empty
  if(pan.length == 0) {
    return false;
  }
  // split the pan so we can work with each digit
  var splitPan = pan.split('');

  // convert chars to ints and reverse the array for easier iteration
  var panDigits = splitPan.map(function(c) { return parseInt(c); }).reverse();

  // get the sum of the digits
  var sum = panDigits.reduce(function(sum, val, idx) {
    // for every 2nd digit, perform doubling process outlined in algorithm
    if(idx % 2 == 1) {
      return sum + doubleDigit(val);
    }

    return sum + val;
  }, 0);

  // passes the Luhn algorithm if the last digit of the sum is 0
  return (sum % 10 == 0);
}

/**
 * @function panShort 
 * @param {String} pan
 * @returns {Boolean} true if the length of pan < MIN_LENGTH 
 */
function panShort(pan) {
  return pan.length < MIN_LENGTH;
}

/**
 * @function panLong
 * @param {String} pan
 * @returns {Boolean} true if the length of pan > MAX_LENGTH 
 */
function panLong(pan) {
  return pan.length > MAX_LENGTH;
}

/**
 * @function panNotNumeric
 * @param {String} pan
 * @returns {Boolean} return true if the pan contains non-numeric characters
 */
//function panNotNumeric(pan) {
//  // regex that matches 1 or non-numeric character 
//  var re = /\D+/;
//  return re.test(pan); 
  //
//}


/**
 * helper for mod10 implementation, return twice a number, if twice a number is greater than 9, twice the number - 9 
 * @private
 * @function doubleDigit
 * @returns {Int} 
 */
function doubleDigit(num) {
  var twice = 2 * num;
  if(twice > 9) {
    return twice - 9;
  }

  return twice;
}
