import EventBus from './EventBus'

const EventBusSingleton = new EventBus()

module.exports = { EventBus, EventBusSingleton }