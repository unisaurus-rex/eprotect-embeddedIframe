/**
 * @file init.js
 */

/**
 * Initialize the form by clearing the form fields
 * @function init
 */
function init(){
	//clear all fields on page view
	window.onpageshow = function(event) {
		clearFields();
	};

	//add fade to modals
	$('a.modals').click(function(event) {
	  $(this).modal({
	    fadeDuration: 450
	  });
	  return false;
	});	
}

/**
 * Clear PAN, CVC, and expiration date form fields
 * @function clearFields
 */
function clearFields(){
	document.getElementById("accountnumber").value = "";
	document.getElementById("cvc").value = "";
	document.getElementById("expMonth").value = "";
	document.getElementById("expYear").value = "";
}
