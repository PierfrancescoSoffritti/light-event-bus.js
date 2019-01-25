(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.EVENT_BUS = {}));
}(this, function (exports) { 'use strict';

	function EventBus() {
	  var subscriptions = {};

	  this.subscribe = function subscribeCallbackToEvent(eventType, callback) {
	    var id = Symbol('id');
	    if (!subscriptions[eventType]) subscriptions[eventType] = {};
	    subscriptions[eventType][id] = callback;
	    return {
	      unsubscribe: function unsubscribe() {
	        delete subscriptions[eventType][id];

	        if (Object.getOwnPropertySymbols(subscriptions[eventType]).length === 0) {
	          delete subscriptions[eventType];
	        }
	      }
	    };
	  };

	  this.publish = function publishEventWithArgs(eventType, arg) {
	    if (!subscriptions[eventType]) return;
	    Object.getOwnPropertySymbols(subscriptions[eventType]).forEach(function (key) {
	      return subscriptions[eventType][key](arg);
	    });
	  };
	}

	var EventBus$1 = EventBus;
	var EventBusSingleton = new EventBus();

	exports.EventBus = EventBus$1;
	exports.EventBusSingleton = EventBusSingleton;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
