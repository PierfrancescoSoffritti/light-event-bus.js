const expect = require('chai').expect
const sinon = require('sinon')
const { EventBus, EventBusSingleton } = require('../src')

describe('index', function() {
    describe('event bus', function() {
        it('basic test', function() {
            // 1. ARRANGE
            const eventBus = new EventBus()

            const eventName = "event1"
            const callback = sinon.stub()
            eventBus.subscribe(eventName, callback)
            
            // 2. ACT
            eventBus.publish(eventName, "message #1")

            // 3. ASSERT
            expect(callback.calledOnce).to.be.true
            expect(callback.calledWith("message #1")).to.be.true
        })
    })

    describe('event bus singleton', function() {
        it('basic test', function() {
            // 1. ARRANGE
            const eventName = "event1"
            const callback = sinon.stub()
            EventBusSingleton.subscribe(eventName, callback)
            
            // 2. ACT
            EventBusSingleton.publish(eventName, "message #1")

            // 3. ASSERT
            expect(callback.calledOnce).to.be.true
            expect(callback.calledWith("message #1")).to.be.true
        })
    })
})