/**
 * @file expiration-validation.js
 * pure validation functions for the expiration Input field
 */

/*
 * Validations:
 * 1) Check if expiration date has passed
 */

/**
 * @function monthNotValid 
 * @param {Int} month
 * @param {Int} year
 * @return {Boolean} false if year <= current year and month >= current month OR if year > current year, true otherwise 
 */
function monthNotValid(month, year) {
  //get current date
  var today = new Date();
  var currentMonth = today.getMonth() + 1; //month begins index at 0
  var currentYear = today.getFullYear(); 

  if(year <= currentYear) {
    return month < currentMonth;
  }

  if(year > currentYear) {
    return false;
  }

}

/**
 * @function monthNotValid 
 * @param {Int} month
 * @return {Boolean} false if year >= current year, true otherwise
 */
function yearNotValid(year) {
  // get current date
  var today = new Date();
  var currentYear = today.getFullYear(); 

  return year < currentYear; 
}
