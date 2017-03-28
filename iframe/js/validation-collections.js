/**
 * @file validation-collections
 * functions that combine the validations run on a field
 */


/**
 * validate the pan and return error strings from validation fails
 * @function panValidations
 * @param {String} pan - a string with no whitespace
 * @return {String[]} array of error strings
 */
function panValidations(pan) {
  var errorMessages = [];
  var err = "";

  if(notNumeric(pan)) {
    err = errLookUp('panNotNumeric');
    if(err.length !== 0) {
      errorMessages.push(err);
    }
  }

  if(panShort(pan)) {
    err = errLookUp('panShort');
    if(err.length !== 0) {
      errorMessages.push(err);
    }

    // no need to do other validations, return error messages
    return errorMessages; 
  }

  if(panLong(pan)) {
    err = errLookUp('panLong');
    if(err.length !== 0) {
      errorMessages.push(err);
    }

    // no need to do other validations, return error messages
    return errorMessages;
  }

  if(!isMod10(pan)) {
    err = errLookUp('isMod10');
    if(err.length !== 0) {
      errorMessages.push(err);
    }
  }

  return errorMessages;
}

/**
 * validate the cvc and return error strings from validation fails
 * @function cvvValidations
 * @param {String} pan
 * @param {String} cvc
 * @return {String[]} array of error strings
 */
function cvcValidations(pan, cvc) {
  var errorMessages = [];
  var err = "";

  if(notNumeric(cvc)) {
    err = errLookUp('cvcNotNumeric');
    if(err.length !== 0) {
      errorMessages.push(err);
    }
  }
  
  if(cvcShort(pan, cvc)) {
    err = errLookUp('cvcShort');
    if(err.length !== 0) {
      errorMessages.push(err);
    }

    // no need to check cvcLong if already short
    return errorMessages;
  }

  if(cvcLong(pan, cvc)) {
    err = errLookUp('cvcLong');
    if(err.length !== 0) {
      errorMessages.push(err);
    }
  }

  return errorMessages;
}
