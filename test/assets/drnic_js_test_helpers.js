/*  Dr Nic's JavaScript Test Helpers, version 0.6.0
 *  (c) 2008 Dr Nic Williams
 *
 *  Dr Nic's JavaScript Test Helpers is freely distributable under
 *  the terms of an MIT-style license.
 *  For details, see the web site: http://www.drnicwilliams.com/
 *
 *--------------------------------------------------------------------------*/

var DrNic = DrNic || {};
DrNic.JsTestHelpers = {
  Version: '0.6.0',
};

// from http://blog.pothoven.net/2007/08/synthesizing-events-in-javascript.html
Event.simulate = function(element, eventName) {
  var event;
  targetElement = $(element);

  if (targetElement) {
   // check for IE
   if (window.ActiveXObject) {
       event = document.createEventObject();
       targetElement.fireEvent("on"+eventName,event);
   } else {
       switch (eventName) {
           case "abort":
           case "blur":
           case "change":
           case "error":
           case "focus":
           case "load":
           case "reset":
           case "resize":
           case "scroll":
           case "select":
           case "submit":
           case "unload":
               event = document.createEvent("HTMLEvents");
               event.initEvent(eventName, "true", "true");
               break;
           case "click":
           case "dblclick":
           case "mousedown":
           case "mousemove":
           case "mouseout":
           case "mouseover":
           case "mouseup":
           case "contextmenu":
               event = document.createEvent("MouseEvents");
               event.initMouseEvent(eventName, true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
               break;
       }
       targetElement.dispatchEvent(event);
     }
  }
}

Event.simulateMouse = Event.simulate;
Event.simulateHtml = Event.simulate;


// Aliasing Element.simulateMouse(element, eventName) to element._eventName()
(function() {
	$w('abort blur change error focus load reset resize scroll select submit unload').
	each(function(eventName){
		Element.Methods['_' + eventName] = function(element) {
			element = $(element);
			Event.simulateHtml(element, eventName, arguments[1] || { });
			return element;
		}
	});

  $w('click dblclick mousedown mousemove mouseout mouseover mouseup contextmenu').
  each(function(eventName){
		Element.Methods['_' + eventName] = function(element) {
			element = $(element);
			Event.simulateMouse(element, eventName, arguments[1] || { });
			return element;
		}
	});
	Element.addMethods();
})()
// Utility library to allow mocking of prototypejs Ajax.Request calls
// within unit tests.
// Within tests or setup, use like:
// Ajax.Request.setupMock("/url/under/test", function(request, response) {
//   response.responseJSON = "data";
//   request.options.onComplete(response);
// });


Ajax.Request.setupMock = function(url, block) {
  Ajax.Request.MockedRequests.set(url, block);
};

Ajax.Request.clearMocks = function() {
  Ajax.Request.MockedRequests = $H();
};

Ajax.Request.clearMocks();

Ajax.Request.prototype.requestOrig = Ajax.Request.prototype.request;
Ajax.Request.prototype.request = function(url) {
  var response = new Ajax.Response(this);
  var request  = this;
  var found    = false;
  Ajax.Request.MockedRequests.each(function(mock) {
    if (!found && url == mock[0]) {
      mock[1](request, response);
      found = true;
    }
  });
  if (!found) {
    return this.requestOrig(url);
  }
};
Test.Unit.Testcase.addMethods({
  assertDifference: function(expr, fn, count) {
    var message = arguments[3] || 'Should be equal';
    var orig = eval(expr);
    fn();
    var after = eval(expr);
    this.assertEqual(orig + count, after, message);
  },

  assertNoDifference: function(expr, fn) {
    var message = arguments[2] || 'Should be equal';
    this.assertDifference(expr, fn, 0, message);
  },
});