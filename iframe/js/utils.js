/**
 * @file utils.js
 * helper functions
 */

/**
 * @function monthStrToInt
 * @param {String} str - value connected to the expMonth dropdown in the format "XX"
 */
function monthStrToInt(str) {
  var re = /^0(\d)$/; // string of length 2 starting with 0 and ending with a digit

  var result = re.exec(str); // returns null if no match, otherwise returns array [match, capture]

  if(result !== null) {
    // get the second digit and parse to integer
    return parseInt(result[1]);
  }

  // else parse the whole string as an integer
  return parseInt(str);

}

/**
 * @function yearStrToInt
 * @param {String} str - year value from ui dropdown
 */
function yearStrToInt(str) {
  // year value from ui is two digits
  return parseInt("20" + str);
}

/**
 * @function stripSpaces
 * Strips all white space
 * @param {String} str
 * @returns {String}
 */
function stripSpaces(str){
  if (str){
    return str.replace(/ /g,'');
  }
  else return "";
}

/**
 * @function errLookUp
 * Return error class given a function
 * @param {String} func - string name of validation function
 * @returns {String} - error class
 */
function errLookUp(func){
  obj = {
    isMod10: "error-871",
    panShort: "error-872",
    panLong: "error-873",
    panNotNumeric: "error-874",
    cvcNotNumeric: "error-881",
    cvcShort: "error-882",
    cvcLong: "error-883"
  };

  if (obj[func]){
    return obj[func];
  }
  else return "";
}

/**
 * @function notNumeric
 * @param {String} str
 * @returns {Boolean} return true if the input string contains non-numeric characters
 */
function notNumeric(str) {
  // regex that matches 1 or non-numeric character 
  var re = /\D+/;
  return re.test(str); 
}

/**
 * Return card type from pan
 * @function detectCardTypePartial
 * @param {String} number 
 * @returns {String}
 */
function detectCardTypePartial(pan) {
  var re = {
    //visa: 4
    visa: /^4/,

    //mastercard 51-55 and 22-27
    mastercard: /^(5[1-5]|2[2-7])/, 
    
    //amex 34, 37
    amex: /^3[47]/, 
    
    //jcb 35
    //jcb: /^35/, 
    
    //unionpay 62, 88
    //unionpay: /^(62|88)/, 
    
    //diners club 30, 36, 38, 39
    //diners: /^(30|36|38|39)/, 
    
    //dankort 5019
    //dankort: /^5019/, 
    
    //forbrugsforeningen 600
    //forbrugsforeningen: /^600/,
    
    //maestro 5018, 502, 503, 506, 56, 58, 639, 6220, 67
    //maestro: /^(5018|502|503|506|56|58|639|6220|67)/, 
    
    //discover: 60, 64, 65, 622
    discover: /^(60|6[4,5]|622)/ 
  };

  for(var key in re) {
    if(re[key].test(pan)) {
        return key;
    }
  }
  return undefined;
}

/**
 * @function isIneligible
 * @param {String} char - character to check
 * @return {Boolean} true if character is not numeric 
 */
function isIneligible(char) {
  var re = /^\D$/; // matches any length one string with non-numeric character
  return re.test(char);
}
