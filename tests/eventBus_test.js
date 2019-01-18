/* global describe it */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import sinon from 'sinon';
import EventBus from '../src/EventBus';

describe('EventBus', function () {
  describe('subscribe', function () {
    it('basic test', function () {
      // 1. ARRANGE
      const eventBus = new EventBus();

      const eventName = 'event1';
      const callback = sinon.stub();
      eventBus.subscribe(eventName, callback);
      // 2. ACT
      eventBus.publish(eventName, 'message #1');
      // 3. ASSERT
      expect(callback.calledOnce).to.be.true;
      expect(callback.calledWith('message #1')).to.be.true;
    });

    it('different events', function () {
      // 1. ARRANGE
      const eventBus = new EventBus();

      const event1 = 'event1';
      const event2 = 'event2';
      const callback1 = sinon.stub();
      const callback2 = sinon.stub();
      eventBus.subscribe(event1, callback1);
      eventBus.subscribe(event2, callback2);
      // 2. ACT
      eventBus.publish(event1, 'message #1');
      eventBus.publish(event2, 'message #2');

      // 3. ASSERT
      expect(callback1.calledOnce).to.be.true;
      expect(callback1.calledWith('message #1')).to.be.true;
      expect(callback2.calledOnce).to.be.true;
      expect(callback2.calledWith('message #2')).to.be.true;
    });

    it('multiple subscribers for same event', function () {
      // 1. ARRANGE
      const eventBus = new EventBus();

      const eventName = 'event1';
      const callback1 = sinon.stub();
      const callback2 = sinon.stub();
      eventBus.subscribe(eventName, callback1);
      eventBus.subscribe(eventName, callback2);
      // 2. ACT
      eventBus.publish(eventName, 'message #1');

      // 3. ASSERT
      expect(callback1.calledOnce).to.be.true;
      expect(callback1.calledWith('message #1')).to.be.true;

      expect(callback2.calledOnce).to.be.true;
      expect(callback2.calledWith('message #1')).to.be.true;
    });
  });

  describe('unsubscribe', function () {
    it('base test', function () {
      // 1. ARRANGE
      const eventBus = new EventBus();

      const event1 = 'event1';

      const callback1 = sinon.stub();
      callback1.withArgs('message #1').returns(1);
      callback1.withArgs('message #2').returns(2);
      callback1.returns(-1);

      const callback2 = sinon.stub();
      callback2.withArgs('message #1').returns(1);
      callback2.withArgs('message #2').returns(2);
      callback2.returns(-1);

      const callback3 = sinon.stub();
      callback3.withArgs('message #1').returns(1);
      callback3.withArgs('message #2').returns(2);
      callback3.returns(-1);

      eventBus.subscribe(event1, callback1);
      const subscription2 = eventBus.subscribe(event1, callback2);
      eventBus.subscribe(event1, callback3);
      // 2. ACT
      eventBus.publish(event1, 'message #1');
      subscription2.unsubscribe();
      eventBus.publish(event1, 'message #2');

      // 3. ASSERT
      expect(callback1.calledTwice).to.be.true;
      expect(callback1.returnValues).to.have.ordered.members([1, 2]);
      expect(callback2.calledOnce).to.be.true;
      expect(callback2.returnValues).to.have.ordered.members([1]);
      expect(callback3.calledTwice).to.be.true;
      expect(callback3.returnValues).to.have.ordered.members([1, 2]);
    });

    it('unsubscribe doesn\'t remove other subscribers to same event', function () {
      // 1. ARRANGE
      const eventBus = new EventBus();

      const event1 = 'event1';

      const callback1 = sinon.stub();
      callback1.withArgs('message #1').returns(1);
      callback1.withArgs('message #2').returns(2);
      callback1.returns(-1);

      const callback2 = sinon.stub();
      callback2.withArgs('message #1').returns(1);
      callback2.withArgs('message #2').returns(2);
      callback2.returns(-1);

      const subscription1 = eventBus.subscribe(event1, callback1);
      eventBus.subscribe(event1, callback2);
      // 2. ACT
      eventBus.publish(event1, 'message #1');
      subscription1.unsubscribe();
      subscription1.unsubscribe();
      eventBus.publish(event1, 'message #2');

      // 3. ASSERT
      expect(callback1.calledOnce).to.be.true;
      expect(callback1.returnValues).to.have.ordered.members([1]);
      expect(callback2.calledTwice).to.be.true;
      expect(callback2.returnValues).to.have.ordered.members([1, 2]);
    });

    it('unsubscribe all', function () {
      // 1. ARRANGE
      const eventBus = new EventBus();

      const event1 = 'event1';

      const callback1 = sinon.stub();
      callback1.withArgs('message #1').returns(1);
      callback1.withArgs('message #2').returns(2);
      callback1.returns(-1);

      const callback2 = sinon.stub();
      callback2.withArgs('message #1').returns(1);
      callback2.withArgs('message #2').returns(2);
      callback2.returns(-1);

      const callback3 = sinon.stub();
      callback3.withArgs('message #1').returns(1);
      callback3.withArgs('message #2').returns(2);
      callback3.returns(-1);

      const subscription1 = eventBus.subscribe(event1, callback1);
      const subscription2 = eventBus.subscribe(event1, callback2);
      const subscription3 = eventBus.subscribe(event1, callback3);
      // 2. ACT
      eventBus.publish(event1, 'message #1');
      subscription1.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
      eventBus.publish(event1, 'message #2');

      // 3. ASSERT
      expect(callback1.calledOnce).to.be.true;
      expect(callback1.returnValues).to.have.ordered.members([1]);
      expect(callback2.calledOnce).to.be.true;
      expect(callback2.returnValues).to.have.ordered.members([1]);
      expect(callback3.calledOnce).to.be.true;
      expect(callback3.returnValues).to.have.ordered.members([1]);
    });

    it('unsubscribe resubscribe', function () {
      // 1. ARRANGE
      const eventBus = new EventBus();

      const event1 = 'event1';

      const callback1 = sinon.stub();
      callback1.withArgs('message #1').returns(1);
      callback1.withArgs('message #2').returns(2);
      callback1.withArgs('message #3').returns(3);
      callback1.returns(-1);

      const callback2 = sinon.stub();
      callback2.withArgs('message #1').returns(1);
      callback2.withArgs('message #2').returns(2);
      callback2.withArgs('message #3').returns(3);
      callback2.returns(-1);

      const callback3 = sinon.stub();
      callback3.withArgs('message #1').returns(1);
      callback3.withArgs('message #2').returns(2);
      callback3.withArgs('message #3').returns(3);
      callback3.returns(-1);

      const subscription1 = eventBus.subscribe(event1, callback1);
      const subscription2 = eventBus.subscribe(event1, callback2);
      const subscription3 = eventBus.subscribe(event1, callback3);
      // 2. ACT
      eventBus.publish(event1, 'message #1');
      subscription1.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
      eventBus.publish(event1, 'message #2');
      eventBus.subscribe(event1, callback1);
      eventBus.publish(event1, 'message #3');

      // 3. ASSERT
      expect(callback1.calledTwice).to.be.true;
      expect(callback1.returnValues).to.have.ordered.members([1, 3]);
      expect(callback2.calledOnce).to.be.true;
      expect(callback2.returnValues).to.have.ordered.members([1]);
      expect(callback3.calledOnce).to.be.true;
      expect(callback3.returnValues).to.have.ordered.members([1]);
    });
  });

  describe('publish', function () {
    it('basic test', function () {
      // 1. ARRANGE
      const eventBus = new EventBus();

      const eventName = 'event1';
      const callback = sinon.stub();
      eventBus.subscribe(eventName, callback);
      // 2. ACT
      eventBus.publish(eventName, 'message #1');
      // 3. ASSERT
      expect(callback.calledOnce).to.be.true;
      expect(callback.calledWith('message #1')).to.be.true;
    });

    it('no subscribers', function () {
      // 1. ARRANGE
      const eventBus = new EventBus();

      const event1 = 'event1';
      const event2 = 'event2';
      const callback = sinon.stub();
      eventBus.subscribe(event2, callback);
      // 2. ACT
      eventBus.publish(event1, 'message #1');
      // 3. ASSERT
      expect(callback.notCalled).to.be.true;
    });

    it('string arg', function () {
      // 1. ARRANGE
      const eventBus = new EventBus();

      const event1 = 'event1';
      const callback = sinon.stub();
      eventBus.subscribe(event1, callback);

      // 2. ACT
      eventBus.publish(event1, 'message #1');

      // 3. ASSERT
      expect(callback.calledOnce).to.be.true;
      expect(callback.calledWith('message #1')).to.be.true;
    });

    it('object arg', function () {
      // 1. ARRANGE
      const eventBus = new EventBus();

      const event1 = 'event1';
      const callback = sinon.stub();
      eventBus.subscribe(event1, callback);
      // 2. ACT
      eventBus.publish(event1, { aString: 'message #1', aNumber: 1, aNestedObj: { } });
      // 3. ASSERT
      expect(callback.calledOnce).to.be.true;
      expect(callback.calledWith({ aString: 'message #1', aNumber: 1, aNestedObj: { } })).to.be.true;
    });

    it('array arg', function () {
      // 1. ARRANGE
      const eventBus = new EventBus();

      const event1 = 'event1';
      const callback = sinon.stub();
      eventBus.subscribe(event1, callback);
      // 2. ACT
      eventBus.publish(event1, [1, 2, 3]);
      // 3. ASSERT
      expect(callback.calledOnce).to.be.true;
      expect(callback.calledWith([1, 2, 3])).to.be.true;
    });
  });
});
