# event-bus.js

[![Build Status](https://travis-ci.com/PierfrancescoSoffritti/event-bus.svg?branch=master)](https://travis-ci.com/PierfrancescoSoffritti/event-bus) [![codecov](https://codecov.io/gh/PierfrancescoSoffritti/event-bus/branch/master/graph/badge.svg)](https://codecov.io/gh/PierfrancescoSoffritti/event-bus) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

event-bus.js a lightweight event bus for Node.js and the browser.

## Table of Contents
1. [Usage](#Usage)
    1. [Browser](#Browser)
        1. [Download](#Download)
        2. [Example](#Example)
    1. [Node.js](#Node.js)
        1. [Download](#Download)
        2. [Example](#Example)
2. [API documentation](#API-documentation)

## Usage
This library can be used both on Node.js and the browser.

### Browser

#### Download
You can [download the library here](./build). For the browser there are 2 choiches: 
1. If you are not using ES6 modules: download `event-bus.min.js` and import it in your app using the `<script>` tag.
2. If you are using ES6 modules: run 
```
npm install event-bus 
```
or
```
yarn add event-bus 
```
Or download `event-bus.module.min.js` and import it using ES6 imports.

These files are also delivered through a CDN at these addresses:
1. `event-bus.min.js`: ___addurl___
2. `event-bus.module.min.js`: ___addurl___

#### Example
1. Not using ES6
```html
<script src='../build/event-bus.min.js'></script>

<script>
  const eventBus = new EVENT_BUS.EventBus()
            
  eventBus.subscribe("event", arg => console.log(arg))
  eventBus.publish("event", "message")
</script>
```

1. Using ES6
```html
<script type="module">
  // if you are using npm/yarn
  import { EventBus } from 'event-bus'
  // if you have manually downloaded the file
  import { EventBus } from '../build/event-bus.module.min.js'

  const eventBus = new EventBus()

  eventBus.subscribe("event", arg => console.log(arg))
  eventBus.publish("event", "message")
</script>
```

### Node.js

#### Download
Run
```
npm install event-bus 
```
or
```
yarn add event-bus 
```
#### Example
```javascript
const { EventBus } = require('event-bus')

const eventBus = new EventBus()
eventBus.subscribe("event", arg => console.log(arg))
eventBus.publish("event", "message")
```

## API documentation

### Table of Contents
1. [EventBus](#EventBus)
    1. [Subscribe](#Subscribe)
    1. [Unsubscribe](#Unsubscribe)
    1. [Publish](#Publish)
2. [EventBusSingleton](#EventBusSingleton)

### EventBus
The `EventBus` constructor can be access through the main object exposed by this library.

If you are using Node.js:
```javascript
const { EventBus } = require('event-bus')
```

If you are using ES6 imports:
```javascript
import { EventBus } from 'event-bus'
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
eventBus.subscribe("event", arg => console.log(arg))
```
- `eventType` can be an object of any type. Strings are recomended.
- `callback` must be a function. This function can have 0 or 1 argument.

#### Unsubscribe
The `subscribe` function returns an object that exposes an `unsubscribe` function.

Call `unsubscribe` to cancel the current subscription.

Example:
```javascript
const subscription = eventBus.subscribe("event", arg => console.log(arg))

// To cancel the subscription
subscription.unsubscribe()
```

#### Publish
Instances of `EventBus` expose a `publish` method.

Call `publish` when you want to publish an event on the event bus.

`publish` takes two arguments: `eventType` and `argument`.

Example:
```javascript
eventBus.publish("event", "message")
```
- `eventType` can be an object of any type. Strings are recomended.
- `argument` will be passed to all the listeners for the event when they are called. It can be of any type.

### EventBusSingleton
Often you will need just one instance of `EventBus` across your entire app, a singleton. The main object of this library already exposes a singleton, so that you don't have to create your own.

You can access the `EventBusSingleton` in the following ways: 

If you are using Node.js:
```javascript
const { EventBusSingleton } = require('event-bus')
```

If you are using ES6 imports:
```javascript
import { EventBusSingleton } from 'event-bus'
```

If you are using `<script>`:
```javascript
const eventBus = new EVENT_BUS.EventBusSingleton()
```

This singleton is just an instance of `EventBus`, so it can be used as any other user-defined `EventBus`.