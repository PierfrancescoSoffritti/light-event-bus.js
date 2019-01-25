function EventBus() {
  const subscriptions = { };

  this.subscribe = function subscribeCallbackToEvent(eventType, callback) {
    const id = Symbol('id');
    if (!subscriptions[eventType]) subscriptions[eventType] = { };
    subscriptions[eventType][id] = callback;
    return {
      unsubscribe: function unsubscribe() {
        delete subscriptions[eventType][id];
        if (Object.getOwnPropertySymbols(subscriptions[eventType]).length === 0) {
          delete subscriptions[eventType];
        }
      },
    };
  };

  this.publish = function publishEventWithArgs(eventType, arg) {
    if (!subscriptions[eventType]) return;

    Object.getOwnPropertySymbols(subscriptions[eventType])
      .forEach(key => subscriptions[eventType][key](arg));
  };
}

export default EventBus;
