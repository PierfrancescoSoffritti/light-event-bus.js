const EventBus = require('./EventBus')

const EventBusSingleton = new EventBus()

module.exports = { EventBus, EventBusSingleton }