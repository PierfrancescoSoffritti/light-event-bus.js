import uuidv4 from './UuidGenerator';

function EventBus() {
  const subscriptions = { };

  this.subscribe = function subscribeCallbackToEvent(eventType, callback) {
    const id = uuidv4();
    if (!subscriptions[eventType]) subscriptions[eventType] = { };
    subscriptions[eventType][id] = callback;
    return {
      unsubscribe: function unsub() {
        delete subscriptions[eventType][id];
        if (Object.keys(subscriptions[eventType]).length === 0) delete subscriptions[eventType];
      },
    };
  };

  this.publish = function publishEventWithArgs(eventType, arg) {
    if (!subscriptions[eventType]) return;

    Object.keys(subscriptions[eventType]).forEach(key => subscriptions[eventType][key](arg));
  };
}

export default EventBus;
