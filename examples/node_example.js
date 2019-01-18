const { EventBus, EventBusSingleton } = require('../build/event-bus')

const eventBus = new EventBus()
eventBus.subscribe("event", arg => console.log(arg))
eventBus.publish("event", "message")

EventBusSingleton.subscribe("event", arg => console.log(arg))
EventBusSingleton.publish("event", "message to singleton")