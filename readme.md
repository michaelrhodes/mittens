# mittens

mittens is a really small, really fast event emitter for all browsers

[![Build status](https://travis-ci.org/michaelrhodes/mittens.svg?branch=master)](https://travis-ci.org/michaelrhodes/mittens)

## Install

```sh
npm install mittens
```

### Usage

```js
var mittens = require('mittens')

// There are many ways to mix
// mittens into an obj
var obj = function () {}
mittens.call(obj)
obj = mittens.call({})
obj = mittens({})

// You can even create an instance
// if you’re that way inclined!
obj = new mittens

// You can add event listeners...
obj.on('event', console.log)
// and emit as many values as you please!
// (each will be passed as an argument)
obj.emit('event', 1)
obj.emit('event', 1, 2)
obj.emit('event', 1, 2, 3)

// You can remove an event listener...
obj.off('event', console.log)
// or all the listeners of an event...
obj.off('event')
// or all the listeners of all events!
obj.off()

// Now go forth!
```

### Benchmarks

```js
var i = 10, j = 1000
while (i--) obj.on('event', function () {})
while (j--) obj.emit('event', j)
```

```sh
[3.42 kB] eventemitter3 x 5,632 ops/s
[4.02 kB] events x 4,961 ops/s
[1.11 kB] mittens x 4,337 ops/s
[0.73 kB] mitt x 1,175 ops/s
[1.68 kB] emitter-component x 234 ops/s
[1.05 kB] tiny-emitter x 233 ops/s
[1.68 kB] component-emitter x 208 ops/s
```

<small>Note: Bundle sizes calculated via `browserify {module-entry} | uglifyjs -cm | wc -c`</small>

### License
[MIT](http://opensource.org/licenses/MIT)
