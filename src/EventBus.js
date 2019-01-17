const uuidv4 = require('uuid/v4')

function EventBus() {
    const subscriptions = { }

    this.subscribe = function(eventType, callback) {
        const id = uuidv4()

        if(!subscriptions[eventType])
            subscriptions[eventType] = { }

        subscriptions[eventType][id] = callback

        return { 
            unsubscribe: function() {
                delete subscriptions[eventType][id]
                if(Object.keys(subscriptions[eventType]).length === 0) delete subscriptions[eventType]
            }
        }
    }

    this.publish = function(eventType, arg) {
        if(!subscriptions[eventType])
            return

        Object.keys(subscriptions[eventType]).forEach(key => subscriptions[eventType][key](arg))
    }
}

module.exports = EventBus