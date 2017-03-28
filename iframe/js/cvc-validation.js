/**
 * @file cvc-validation-js
 * pure validation function@s for the CVC Input field
 */

/*
 * Validations:
 * 1) CVC under length
 * 2) CVC over length
 * 3) CVC not numeric
 */

/**
 * Check CVC for non numberic characters
 * @function cvcNotNumeric
 * @param {String} cvc
 * @returns {Boolean}
 */
//function cvcNotNumeric(cvc){
//  // regex that matches 1 or non-numeric character 
//  var re = /\D+/;
//  return re.test(cvc); 
//}

/**
 * Check if cvc length is too short
 * @function cvcShort
 * @param {String} cvc
 * @returns {Boolean}
 */
function cvcShort(pan, cvc){
	var type = detectCardTypePartial(pan);
	var length = getCvcLengthByCardType(type);
	return underLength(cvc, Math.floor(length));
}

/**
 * Check if cvc length is too long
 * @function cvcLong
 * @param {String} cvc
 * @returns {Boolean}
 */
function cvcLong(pan, cvc){
	var type = detectCardTypePartial(pan);
	var length = getCvcLengthByCardType(type);
	return overLength(cvc, Math.ceil(length));
}

/**
 * Check if string length is too long
 * @function overLength
 * @param {String} str
 * @param {Number} length
 * @returns {Boolean}
 */
function overLength(str, length){
	if (str.length > length)
		return true;
	else 
		return false;
}

/**
 * Check if string length is too short
 * @function underLength
 * @param {String} str
 * @param {Number} length
 * @returns {Boolean}
 */
function underLength(str, length){
	if (str.length < length)
		return true;
	else
		return false;
}


/**
 * Return length of CVC given a card type
 * @function getCvcLengthByCardType
 * @param {String} type
 * @returns {Number}
 */
function getCvcLengthByCardType(type){
	var map = {
		visa: 3,
		mastercard: 3,
		discover: 3,
		amex: 3.5, //amex can be 3 or 4
		maestro: 3,
		forbrugsforeningen: 3,
		dankort: 3,
		diners: 3,
		unionpay: 3,
		jcb: 3
	};
	if (type in map){
		return map[type];
	}
	else
		return 3.5;
}

/**
 * Check CVC for non numberic characters and for exact length
 * @function cvcLengthAndNumbericCheck
 * @param {String} cvc
 * @param {Number} length 
 * @returns {Boolean}
 */
function cvcLengthAndNumericCheck(cvc, length){
	var regex = new RegExp("^[0-9]{" + length + "}$");
	var isnum = /^[0-9]+$/.test(cvc);
	return isnum;
}
