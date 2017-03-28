/**
 * event handler for expiration month
 * @function handleMonthEvent
 * @param {Object} e - event object
 */
function handleMonthEvent(e) {
  // can't validate the month without the year
  var year = $('#expYear').val();

  // if year is undefined, no way to know if month invalid
  if(year !== null) {
    // get selected month value
    // month dropdown has a default selected value so don't need to check for undefined
    var month = e.target.value;
    var notValid = monthNotValid(monthStrToInt(month), yearStrToInt(year));

    // Update the dom
    // monthValid expects true if month is valid so have to flip the value
    monthValidUi(!notValid);
  }

}

/**
 * event handler for expiration year
 * @function handleYearEvent
 * @param {object} e - event object
 */

function handleYearEvent(e) {
  // convert the year and month selctions so we can validate them
  var year = e.target.value;
  var isYearValid = false;
  var isMonthValid = true;

  if(year !== null) {
    year = yearStrToInt(e.target.value);
    var month = monthStrToInt($('#expMonth').val());

    // need to pass these values to month/yearValidUi functions so we flip their value
    isYearValid = !yearNotValid(year);
    isMonthValid = !monthNotValid(month, year);
  }

  // if year is null, uses default values for isMonthValid, isYearValid
  monthValidUi(isMonthValid);
  yearValidUi(isYearValid);

}
