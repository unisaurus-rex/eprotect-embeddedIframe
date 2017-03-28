/**
 * @file field-ux.js
 *Form UI/UX DOM manipulation
 */

/**
 * Switches the credit card icon svg on the #ccicon html element
 * @function iconSwitch
 * @returns {String}
 */

function iconSwitch(cardvar) {
  var icon = $('#ccicon');

  switch (cardvar) {
  case 'amex':
    icon.removeClass().addClass('fa fa-cc-amex fa-lg');
    break;

  case 'discover':
    icon.removeClass().addClass('fa fa-cc-discover fa-lg');
    break;

  case 'mastercard':
    icon.removeClass().addClass('fa fa-cc-mastercard fa-lg');
    break;

  case 'visa':
    icon.removeClass().addClass('fa fa-cc-visa fa-lg');
    break;

  default:
    icon.removeClass().addClass('fa fa-credit-card fa-lg');
    break;
  }
  return cardvar;
};


function panValidUi(errs) {

  var elements = $('#numberDiv,#accountnumber,#accountNumberLabelBefore,#accountNumberLabelAfter,#accountNumberLabelText')
  elements.removeClass();

  if (errs.length == 0) {
    elements.addClass('valid');
  }
  else {
    for (var i =0; i< errs.length; i++){
      elements.addClass( errs[i] );
    }
    elements.addClass("invalid");
  }
};

/**
 * Update the expiration year field's css classes based on input's validity
 * @function monthValidUi
 * @param {Boolean} isValid - true if month input is valid
 */
function monthValidUi(isValid) {
  var elements = $('#expMonth,#expMonthLabelBefore,#expMonthLabelAfter,#expDateLabelText');

  if (isValid) {
    elements.removeClass().addClass('valid');
  }
  else {
    elements.removeClass().addClass('invalid');
  }
}

/**
 * Update the expiration year field's css classes based on the inputs validity
 * @function yearValidUi
 * @param {Boolean} isValid - true if year is valid
 */
function yearValidUi(isValid) {
  var elements = $('#expYear,#expYearLabelBefore,#expYearLabelAfter,#expDateLabelText');

  if (isValid) {
    elements.removeClass().addClass('valid');
  }
  else {
    elements.removeClass().addClass('invalid');
  }

}

function cvcValidUi(errs) {
  var elements = $('#cvvDiv, #cvc,#cvvLabelBefore,#cvvNumberLabelAfter,#cvvLabelText')
  elements.removeClass();

  if (errs.length == 0) {
    elements.addClass('valid');
  }
  else {
    for (var i =0; i< errs.length; i++){
      elements.addClass( errs[i] );
    }
    elements.addClass("invalid");
  }
};
