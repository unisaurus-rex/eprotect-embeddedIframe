/**
 * @file validation-listeners.js
 * event listeners for field validation
 */

//Account Number Events
$('#accountnumber').blur(panBlur);
$('#accountnumber').bind("paste", panPaste);
$("#accountnumber").keypress(panKeyPress);
$("#accountnumber").keyup(panKeyUp);

// CVC Events
$('#cvc').blur(cvcBlur)
$('#cvc').bind("paste", cvcPaste);
$("#cvc").keypress(cvcKeyPress);

// Expiration Events
$('#expMonth').blur(handleMonthEvent);
$('#expMonth').change(handleMonthEvent);
$('#expYear').blur(handleYearEvent);
$('#expYear').change(handleYearEvent);

//clear success and errors on focus
$("#cvc").focus( function(e){
	var elements = $('#cvvDiv, #cvc,#cvvLabelBefore,#cvvNumberLabelAfter,#cvvLabelText')
	elements.removeClass();
});
$("#accountnumber").focus( function(e){
	var elements = $('#numberDiv,#accountnumber,#accountNumberLabelBefore,#accountNumberLabelAfter,#accountNumberLabelText')
	elements.removeClass();
});