jQuery(document).ready(function() {
  console.log('app js: ready');
  
  function payframeClientCallback(res) {
    console.log("payframe client callback: message received");
    console.log(res);
  }

  function inputsEmptyCallback(res) {
    console.log("inputsEmptyCallback: message received");
    console.log(res);
    var isEmpty = res.allInputsEmpty;
    if(isEmpty) {
      console.log("Card input fields empty");
      // do other stuff as needed
    } else {
      console.log("Card inputs not empty");
      // do other stuff as needed
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

  // add button click handlers 
  $("#getRegId").click(function(e) {
    var msg = {
      id: "1234",
      orderId: "5678",
      pciNonSensitive: true
    };
    payframeClient.getPaypageRegistrationId(msg);
  });                           

  $("#emptyInputs").click(function(e) {
    payframeClient.allInputsEmpty();
  });                           

});
