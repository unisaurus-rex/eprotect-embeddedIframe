/**
 * @file pan-listeners-js
 * listener functions for pan events
 */

/**
 * @function panKeyPress 
 * handle pan keypress events 
 * @param {Object} e - event object
 */
function panKeyPress(e) { 
  //get character code
  var charCode = e.which || e.keyCode;

  //if ineligible character return false
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
  }else{
    return true;
  }
}

/**
 * @function panKeyUp 
 * handle pan keyup events 
 * @param {Object} e - event object
 */
function panKeyUp(e){
  //if number do below
  var charCode = e.which || e.keyCode;

  //if charCode maps to a number pad key, subtract 48
  //48 is the offset to the number key (row)
  if (charCode >= 96 && charCode <= 105)
    charCode = charCode = 48;

  var c = String.fromCharCode(charCode);
  
  //if char is numeric
  if ( !isIneligible(c) ){
    
    //update field with formatted pan
    var pan = $("#accountnumber").val();
    $("#accountnumber").val(formatPan(pan));  
    
    //update card icon based on card type
    var type = detectCardTypePartial(pan);
    iconSwitch(type);
  }
}

/**
 * @function panBlur 
 * handle pan blur events 
 */
function panBlur() {
  //get pan
  var pan = $("#accountnumber").val();

  //strip spaces  
  pan = stripSpaces(pan);

  //update dom with formatted pan
  $("#accountnumber").val(formatPan(pan));

  //validate pan
  var panErrs = panValidations(pan);

  //update dom
  panValidUi(panErrs);

  //update card icon based on card type
  var type = detectCardTypePartial(pan);
  iconSwitch(type);

  //get cvv
  var cvc = $("#cvc").val();

  //if cvc has been filled out validate it and update dom
  if (cvc) {
    var cvcErrs = cvcValidations(pan, cvc)
    cvcValidUi(cvcErrs);
  }
}

/**
 * @function panPaste 
 * handle pan paste events 
 * @param {Object} e - event object
 */
function panPaste(e) {
  //get pan
  var pan = e.originalEvent.clipboardData.getData('text');

  //strip spaces  
  pan = stripSpaces(pan);

  //update dom with formatted pan
  $("#accountnumber").val(formatPan(pan));

  //validate pan
  var panErrs = panValidations(pan);

  //update dom
  panValidUi(panErrs);

  //update card icon based on card type
  var type = detectCardTypePartial(pan);
  iconSwitch(type);

  //get cvv
  var cvc = $("#cvc").val();

  if (cvc) {
    //if cvv is not empty run cvv validations
    var cvcErrs = cvcValidations(pan, cvc)

    //update dom
    cvcValidUi(cvcErrs);
  }
  //do not paste text from clipboard
  return false;
}