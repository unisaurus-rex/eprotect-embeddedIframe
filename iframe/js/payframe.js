/* global jQuery */
/* global eProtect */
/* global yepnope */
/*!
 * Litle & Co. Pay Fame Java Script API Version: 1.0 Copyright © 2003-2015,
 * Litle & Co. ALL RIGHTS RESERVED. Includes payframe.js https://www.litle.com
 */
$( document ).ready(function() {
  console.log("payframe.js: ready");
  //Remove error handling classes on focus
  $("#accountNumber").focus(function() {
    $(".numberDiv").removeClass("error error-871 error-872 error-874 error-876");
  });
  $("#cvv").focus(function() {
    $(".cvvDiv").removeClass("error error-881 error-882");
  });
  var response = {ready : true };
  var jsonPath = '/' + $("#appPath").val() + '/js/json2-20140404.min.js';
  yepnope({
    test : window.JSON,
    nope : [ jsonPath ],
    complete : function () {
      window.parent.postMessage(JSON.stringify(response), '*');
    }
  });
  jQuery(document).click(function(event) {
    console.log("payframe.js: click");
    var title=jQuery(".title");
    if(title.length) {
      title.remove();
    }
  });
});
var eProtectPayFrame = function () {
  "use strict";
  var shouldUseCvv = false;

  var submitAfterCall = function (response) {
    console.log("payframe.js: submitAfterCall");
    response.expMonth = jQuery("#expMonth").val();
    response.expYear = jQuery("#expYear").val();
    $("#cvv").val("XXX");
    window.parent.postMessage(JSON.stringify(response), '*');
  };

  var onErrorAfterCall = function (response) {
    console.log("payframe.js: onErrorAfterCall");
    var errorCode = response.response;
    /*
      "871" : "Account number not mod10",
      "872" : "Account number too short",
      "873" : "Account number too long",
      "874" : "Account number not numeric",
      "875" : "Unable to encrypt field",
      "876" : "Account number invalid",
      "881" : "Card validation num not numeric",
      "882" : "Card validation num too short",
      "883" : "Card validation num too long",
      "884" : "PayFrame HTML failed to load",
      "885" : "PayFrame CSS failed to load",
      "889" : "Failure"
    */
    //we only check for user error here, so no error classes are added for 875, 884, 885 or 889
    if(errorCode === "871") {
      $(".numberDiv").addClass("error");
      $(".numberDiv").addClass("error-871");
    }
    else if(errorCode === "872") {
      $(".numberDiv").addClass("error");
      $(".numberDiv").addClass("error-872");
    }
    else if(errorCode === "874") {
      $(".numberDiv").addClass("error");
      $(".numberDiv").addClass("error-874");
    }
    else if(errorCode === "876") {
      $(".numberDiv").addClass("error");
      $(".numberDiv").addClass("error-876");
    }
    else if(errorCode === "881") {
      $(".cvvDiv").addClass("error");
      $(".cvvDiv").addClass("error-881");
    }
    else if(errorCode === "882") {
      $(".cvvDiv").addClass("error");
      $(".cvvDiv").addClass("error-882");
    }
    //all errors (user or not) are returned to the outer frame
    window.parent.postMessage(JSON.stringify(response), '*');
  }

  var onTimeoutAfterCall = function () {
    var response = {timeout : true };
    console.log("payframe.js: onTimeoutAfterCall");
    window.parent.postMessage(JSON.stringify(response), '*');
  };

  var getPaypageRegistrationId = function (message) {
    console.log("payframe.js: getPaypageRegistrationId");
    console.log(message);
    var eProtectRequest = {
      "paypageId" : message.paypageId,
      "reportGroup" : message.reportGroup,
      "orderId" : message.orderId,
      "id" : message.id,
      "url" : "" // TODO Different in non-dev?
    };

    if (message.pciNonSensitive){
      eProtectRequest.pciNonSensitive = true;
    }

    var formFields = {
      "accountNum" : document.getElementById('accountNumber'),
      "paypageRegistrationId" : document
        .getElementById('paypageRegistrationId'),
      "bin" : document.getElementById('bin')
    };
    if (shouldUseCvv) {
      formFields.cvv2 = document.getElementById('cvv');
    }

    var timeout = message.timeout;
    if ($("#appPath").val() === 'LitlePayPage') {
      var eProtectCaller = new LitlePayPage();
      eProtectCaller.sendToLitle(eProtectRequest, formFields, submitAfterCall,
	                         onErrorAfterCall, onTimeoutAfterCall, timeout);
    }
    else {
      var eProtectCaller = new eProtect();
      eProtectCaller.sendToEprotect(eProtectRequest, formFields, submitAfterCall,
	                            onErrorAfterCall, onTimeoutAfterCall, timeout);
    }

  };

  var showCvv = function (message) {
    console.log("payframe.js: showCvv");
    console.log(message);
    if (message) {
      jQuery(".cvvDiv").show();
      shouldUseCvv = true;
    } else {
      jQuery(".cvvDiv").hide();
      shouldUseCvv = false;
    }
  };

  var setMonths = function (message) {
    console.log("payframe.js: setMonths");
    console.log(message);
    var months = message;
    jQuery("#expMonth")[0][0].text = months['1'];
    jQuery("#expMonth")[0][1].text = months['2'];
    jQuery("#expMonth")[0][2].text = months['3'];
    jQuery("#expMonth")[0][3].text = months['4'];
    jQuery("#expMonth")[0][4].text = months['5'];
    jQuery("#expMonth")[0][5].text = months['6'];
    jQuery("#expMonth")[0][6].text = months['7'];
    jQuery("#expMonth")[0][7].text = months['8'];
    jQuery("#expMonth")[0][8].text = months['9'];
    jQuery("#expMonth")[0][9].text = months['10'];
    jQuery("#expMonth")[0][10].text = months['11'];
    jQuery("#expMonth")[0][11].text = months['12'];
  };

  var setYears = function (message) {
    console.log("payframe.js: setYears");
    console.log(message);
    var numYearsToAdd = message;

    var numOfYearsToRemove = jQuery("#expYear option").size();
    for ( var i = 0; i < numOfYearsToRemove; i++) {
      jQuery("#expYear option:first").remove();
    }

    var currentYear = new Date().getFullYear();
    for ( var j = 0; j < numYearsToAdd; j++) {
      var o = new Option(currentYear + j, currentYear + j - 2000);
      jQuery(o).html(currentYear + j); // For IE8
      jQuery("#expYear").append(o);
    }
  };

  //    var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
  //    var tagOrComment = new RegExp(
  //        '<(?:'
  //        // Comment body.
  //        + '!--(?:(?:-*[^->])*--+|-?)'
  //        // Special "raw text" elements whose content should be omited
  //        + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
  //        + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
  //        // Regular name
  //        + '|/?[a-z]'
  //        + tagBody
  //        + ')>',
  //        'gi');
  //    var removeTags = function(html) {
  //      var oldHtml;
  //      do {
  //        oldHtml = html;
  //        html = html.replace(tagOrComment, '');
  //      } while (html !== oldHtml);
  //      return html.replace(/</g, '&lt;');
  //    }

  var setTooltipText = function (message) {
    console.log("payframe.js: setTooltipText");
    var text = message;
    //text = removeTags(text);
    jQuery(".tooltip").attr("title", text);
    jQuery(".tooltip").attr("style","");
    jQuery(".tooltip").click(function(event) {
      console.log("payframe.js: click");
      var title=jQuery(".title");
      var cvvDiv=jQuery(".cvvDiv");
      if(!title.length) {
        //$(cvvDiv).append('<span class="title">'+$(this).attr("title")+"</span>");
        $(cvvDiv).append('<span class="title" id="cvvTooltipTitle"></span>');
        $("#cvvTooltipTitle").text(text);
        $(".title").click(function () { });
      }
      else {
        title.remove();
      }
      return false;
    });
  };

  var setTabIndex = function (message) {
    console.log("payframe.js: setTabIndex");
    console.log(message);
    if(message.cvv) {
      $("#cvv").attr("tabindex",message.cvv);
    }
    if(message.accountNumber) {
      $("#accountNumber").attr("tabindex",message.accountNumber);
    }
    if(message.expMonth) {
      $("#expMonth").attr("tabindex",message.expMonth);
    }
    if(message.expYear) {
      $("#expYear").attr("tabindex",message.expYear);
    }
  };

  var setPlaceholderText = function(message) {
    console.log("payframe.js: setPlaceholderText");
    console.log(message);
    if(message.cvv) {
      $("#cvv").attr("placeholder",message.cvv);
    }
    if(message.accountNumber) {
      $("#accountNumber").attr("placeholder", message.accountNumber);
    }
  }

  var getDocHeight = function() {
    var D = document;
    var height = Math.max(
      Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
      Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
      Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
    var response = {"height" : height };
    var jsonPath = '/' + $("#appPath").val() + '/js/json2-20140404.min.js';
    yepnope({
      test : window.JSON,
      nope : [ jsonPath ],
      complete : function () {
        window.parent.postMessage(JSON.stringify(response), '*');
      }
    });
  }

  /**
   * @function allInputsEmpty
   * if pan and cvv are empty, post a message with value of true, otherwise post value of false
   */
  var allInputsEmpty = function() {
    console.log("payframe.js: allInputsEmpty");

    // get pan and cvv values and check their length
    var panValue = $("#accountNumber").val();
    var cvvValue = $("#cvv").val();
    var inputsEmpty = (panValue.length == 0 && cvvValue.length == 0);

    // build response
    var response = {"allInputsEmpty" : inputsEmpty}; 
    var jsonPath = '/' + $("#appPath").val() + '/js/json2-20140404.min.js';

    // send response
    yepnope({
      test : window.JSON,
      nope : [ jsonPath ],
      complete : function () {
        window.parent.postMessage(JSON.stringify(response), '*');
      }
    });
  }

  return {
    receivedMessageFromOuterFrame : function (message) {
      console.log("payframe.js: receivedMessageFromOuterFrame");
      console.log(message);
      var action = message.action;
      console.log("payframe.js: action: " + action);
      if (action === "getPaypageRegistrationId") {
        getPaypageRegistrationId(message);
      } else if (action === "configure") {
        if (message.months) {
          setMonths(message.months);
        }
        if (message.numYears) {
          setYears(message.numYears);
        }
        if (message.showCvv) {
          showCvv(message.showCvv);
        }
        if (message.tooltipText) {
          setTooltipText(message.tooltipText);
        }
        if (message.tabIndex) {
          setTabIndex(message.tabIndex)
        }
        if (message.placeholderText) {
          setPlaceholderText(message.placeholderText);
        }
      } else if (action === "getDocHeight") {
        getDocHeight();
      } else if (action === "allInputsEmpty") {
        allInputsEmpty();
      } else {
        console.log("payframe.js: received unknown action: " + event.data.action);
      }

    }
  };
};

var epFrame = new eProtectPayFrame();

var eventHandler = function (event) {
  console.log(event.data);
  var messageAsString = event.data;
  var jsonPath = '/' + $("#appPath").val() + '/js/json2-20140404.min.js';
  yepnope({
    test : window.JSON,
    nope : [ jsonPath ],
    complete : function () {
      var message = JSON.parse(messageAsString);
      epFrame.receivedMessageFromOuterFrame(message);
    }
  });
};

if (window.addEventListener) {
  window.addEventListener("message", eventHandler, false);
} else if (window.attachEvent) {
  window.attachEvent("onmessage", eventHandler);
}
