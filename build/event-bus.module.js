/**
 * Source: https://gist.github.com/jed/982883
*/

/* eslint-disable */
function b(a) {
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
}
/* eslint-enable */

function EventBus() {
  var subscriptions = {};

  this.subscribe = function subscribeCallbackToEvent(eventType, callback) {
    var id = b();
    if (!subscriptions[eventType]) subscriptions[eventType] = {};
    subscriptions[eventType][id] = callback;
    return {
      unsubscribe: function unsub() {
        delete subscriptions[eventType][id];
        if (Object.keys(subscriptions[eventType]).length === 0) delete subscriptions[eventType];
      }
    };
  };

  this.publish = function publishEventWithArgs(eventType, arg) {
    if (!subscriptions[eventType]) return;
    Object.keys(subscriptions[eventType]).forEach(function (key) {
      return subscriptions[eventType][key](arg);
    });
  };
}

var EventBus$1 = EventBus;
var EventBusSingleton = new EventBus();

export { EventBus$1 as EventBus, EventBusSingleton };
