jQuery(document).ready(function() {
  console.log('app js: ready');
  var eventHandler = function (e) {
    "use strict";
    var response = JSON.parse(e.data);
    console.log("custom callback");
    console.log(response);
  }
  
  function payframeClientCallback(res) {
    console.log("payframe client callback: message received");
    console.log(res);
  }

  function inputsEmptyCallback(res) {
    console.log("inputsEmptyCallback: message received");
    console.log(res);
    var isEmpty = JSON.parse(res).allInputsEmpty;
    if(isEmpty) {
      console.log("Card input fields empty");
    } else {
      var msg = {id: "1234", orderId: "5678"};
      payframeClient.getPaypageRegistrationId(msg);
    }
  }

  var configure = {
    paypageId: "myregistrationid",
    style: "test",
    reportGroup: "group1",
    timeout: "5000",
    div: "payframe",
    callback: payframeClientCallback,
    inputsEmptyCallback: inputsEmptyCallback,
    showCvv: true,
    numYears: 8,
    tabIndex: {
      cvv: 4,
      accountNumber: 1,
      expMonth: 2,
      expYear: 3
    },
  };



  var payframeClient = new LitlePayframeClient(configure);

  setTimeout(payframeClient.autoAdjustHeight, 400);

  window.inputsEmpty = function() {
    payframeClient.allInputsEmpty();
  };

  // add submit handler
  $("#regButton").click(function(e) {
    console.log('button selected');
    payframeClient.allInputsEmpty();
  });                           
});
