# light-event-bus.js

[![](https://img.shields.io/npm/v/light-event-bus.svg?colorB=g)](https://www.npmjs.com/package/light-event-bus)
[![Build Status](https://travis-ci.org/PierfrancescoSoffritti/light-event-bus.js.svg?branch=master)](https://travis-ci.org/PierfrancescoSoffritti/light-event-bus.js) [![codecov](https://codecov.io/gh/PierfrancescoSoffritti/light-event-bus.js/branch/master/graph/badge.svg)](https://codecov.io/gh/PierfrancescoSoffritti/light-event-bus.js) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

light-event-bus.js is a lightweight event bus for Node.js and the browser.

## Table of Contents
1. [Usage](#Usage)
    1. [Browser](#Browser-usage)
        1. [Download](#Download---browser)
        2. [Example](#Example---browser)
    1. [Node.js](#Nodejs-usage)
        1. [Download](#Download---node)
        2. [Example](#Example---node)
2. [API documentation](#API-documentation)

## Usage
This library can be used both with Node.js and the browser.

### Browser usage

#### Download - browser
You can [download the library here](./build). For the browser there are 2 options: 
1. Download `light-event-bus.min.js` [here](./build/light-event-bus.min.js) and import it in your app using the `<script>` tag.
2. If you are using ES modules, download the library ([here](./build/light-event-bus.min.js) or through [NPM](https://www.npmjs.com/package/light-event-bus)) and import it using ES6 imports.

This file is also delivered through a CDN at [this address](https://unpkg.com/light-event-bus@1.0.0/build/light-event-bus.min.js).

#### Example - browser
1. Importing with `<script>` tag
```html
<script src='../build/light-event-bus.min.js'></script>

<script>
  const eventBus = new EVENT_BUS.EventBus()
            
  const subscription = eventBus.subscribe('event', arg => console.log(arg))
  eventBus.publish('event', 'message')

  subscription.unsubscribe()
</script>
```

2. Importing ES module
```html
<script type='module'>
  import { EventBus } from 'light-event-bus'

  const eventBus = new EventBus()

  const subscription = eventBus.subscribe('event', arg => console.log(arg))
  eventBus.publish('event', 'message')

  subscription.unsubscribe()
</script>
```

### Node.js usage

#### Download - node
Run
```
npm install light-event-bus 
```
or
```
yarn add light-event-bus 
```
#### Example - node
```javascript
const { EventBus } = require('light-event-bus')

const eventBus = new EventBus()

const subscription = eventBus.subscribe('event', arg => console.log(arg))
eventBus.publish('event', 'message')

subscription.unsubscribe()
```

## API documentation

### Table of Contents
1. [EventBus](#EventBus)
    1. [Subscribe](#Subscribe)
    1. [Unsubscribe](#Unsubscribe)
    1. [Publish](#Publish)
2. [EventBusSingleton](#EventBusSingleton)

### EventBus
The `EventBus` constructor can be accessed through the main object exposed by this library.

If you are using Node.js:
```javascript
const { EventBus } = require('light-event-bus')
```

If you are using ES6 imports:
```javascript
import { EventBus } from 'light-event-bus'
```

If you are using `<script>`:
```javascript
const eventBus = new EVENT_BUS.EventBus()
```

#### Subscribe
Instances of `EventBus` expose a `subscribe` method.

Call `subscribe` when you want to start listening for an event.

`subscribe` takes two arguments: `eventType` and `callback`.

Example:
```javascript
eventBus.subscribe('event', arg => console.log(arg))
```
- `eventType` can be an object of any type. Strings are recomended.
- `callback` must be a function. This function can have 0 or 1 argument.

#### Unsubscribe
`subscribe` returns an object that exposes an `unsubscribe` method.

Call `unsubscribe` to cancel the current subscription.

Example:
```javascript
const subscription = eventBus.subscribe('event', arg => console.log(arg))

// To cancel the subscription
subscription.unsubscribe()
```

#### Publish
Instances of `EventBus` expose a `publish` method.

Call `publish` when you want to publish an event on the event bus.

`publish` takes two arguments: `eventType` and `argument`.

Example:
```javascript
eventBus.publish('event', 'message')
```
- `eventType` can be an object of any type. Strings are recomended.
- `argument` is optional. It will be passed to all the listeners for the event. It can be of any type.

In the case of this examples, only subscribers of the event `'event'` will be called, with the string `'mesage'` as argument.

### EventBusSingleton
Often a single instance of `EventBus` is needed across an entire application, a singleton. The main object of this library already exposes a singleton, so that you don't have to create your own.

You can access the `EventBusSingleton` in the following ways: 

If you are using Node.js:
```javascript
const { EventBusSingleton } = require('light-event-bus')
```

If you are using ES6 imports:
```javascript
import { EventBusSingleton } from 'light-event-bus'
```

If you are using `<script>`:
```javascript
const eventBus = new EVENT_BUS.EventBusSingleton()
```

This singleton is just an instance of `EventBus`, so it can be used as any other user-defined `EventBus`.