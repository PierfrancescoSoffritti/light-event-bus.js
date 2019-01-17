'use strict';

var _EventBus = require('./EventBus');

var _EventBus2 = _interopRequireDefault(_EventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventBusSingleton = new _EventBus2.default();

module.exports = { EventBus: _EventBus2.default, EventBusSingleton: EventBusSingleton };