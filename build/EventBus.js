'use strict';

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EventBus() {
    var subscriptions = {};

    this.subscribe = function (eventType, callback) {
        var id = (0, _v2.default)();

        if (!subscriptions[eventType]) subscriptions[eventType] = {};

        subscriptions[eventType][id] = callback;

        return {
            unsubscribe: function unsubscribe() {
                delete subscriptions[eventType][id];
                if (Object.keys(subscriptions[eventType]).length === 0) delete subscriptions[eventType];
            }
        };
    };

    this.publish = function (eventType, arg) {
        if (!subscriptions[eventType]) return;

        Object.keys(subscriptions[eventType]).forEach(function (key) {
            return subscriptions[eventType][key](arg);
        });
    };
}

module.exports = EventBus;