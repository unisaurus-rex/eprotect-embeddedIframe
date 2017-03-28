/**
 * @file formatPan-js
 * Format PAN field by adding white space
 */

/**
 * Format PAN by adding spaces
 * If card type can not be detected no formatting will be added
 * Function willnot work if PAN has been pasted
 * @function formatPan
 * @param {String} pan 
 * @returns {String}
 */
function formatPan( pan ){
  var type = detectCardTypePartial(pan);

  if (type == "amex"){
    return format4x6x5(pan);
  }
  else if (type == "visa" || type == "mastercard" || type == "discover" 
        || type == "jcb" || type == "dankort"){
    return format4x4x4x4(pan);
  }
  else
    return pan;
}


/**
 * Format PAN using "xxxx xxxxxx xxxxx" pattern
 * Function will not work if pan has been pasted
 * @function format4x6x5
 * @param {String} pan 
 * @returns {String}
 */
function format4x6x5(pan){

  //start at index of first space
  var i = 4;
  //if i is at valid index
  if (i <= pan.length){
    //check if there is a space
    if (pan.charAt(i) != ' '){
      //if there is no space add one
      pan = pan.slice( 0, i) + " " + pan.slice(i, pan.length);
    }    
  }

  //go to index of second space
  i = 11;
  if (i <= pan.length){
    if (pan.charAt(i) != ' '){
      pan = pan.slice( 0, i) + " " + pan.slice(i, pan.length);
    }    
  }

  return pan;
}

/**
 * Format PAN using "xxxx xxxx xxxx xxxx" pattern
 * Function will not work if pan has been pasted
 * @function format4x4x4x4
 * @param {String} pan 
 * @returns {String}
 */
function format4x4x4x4(pan){
  //assume the string passed in has valid characters
  
  //start at index of first space
  var i =4; 
  
  while( i <= pan.length && i < 15 ){
    //check it i is at valid index
    if( i <= pan.length){
      //check if there is a space
      if (pan.charAt(i) != ' '){
        //if there is no space add one
        pan = pan.slice( 0, i) + " " + pan.slice(i, pan.length)
      }
    }
    //jump to location of next space
    i = i+5;
  }
  //return formatted pan
  return pan;
}
