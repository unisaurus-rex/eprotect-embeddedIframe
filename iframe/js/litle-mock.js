/**
 * @file litle-mock.js
 * mock litle_api3.js for testing
 */

function LitlePayPage() {
  return {
    sendToLitle: function(litleRequest, litleFormFields, successCallback,
			  errorCallback, timeoutCallback, timeout) {

      var pan = litleFormFields.accountNum.value;
      var res = {};
      
      if(pan.length == 3) {
        // length 3 cvv should be error code user wants to test
        res.response = pan;      
        errorCallback(res);
      } else if(pan.length == 4) {
        // otherwise cvv should be length 4, use it to test timeoutCallback
        res.response = "mock timeout";
        timeoutCallback(res);
      } else {
        res.response = "success";
        successCallback(res);
      }
        
    }
  };
};
