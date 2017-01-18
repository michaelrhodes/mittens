# mittens

mittens is a really small, really fast event emitter for browsers

[![Build status](https://travis-ci.org/michaelrhodes/mittens.svg?branch=master)](https://travis-ci.org/michaelrhodes/mittens)

## Install

```sh
npm install mittens
```

### Usage

mittens mixes into any object or function

```js
var mittens = require('mittens')

var obj = {}
var fn = function () {}

mittens.call(obj)
mittens.call(fn)

fn.on('call', function () {})
obj.on('prop', fn)
obj.emit('prop', 1, 2, 3)
obj.off('prop', fn)
fn.off('call')
```

### Benchmarks

```js
var i = 10, j = 1000
while (i--) obj.on('event', function () {})
while (j--) obj.emit('event', j)
```

```sh
#1 [9.19 kB] eventemitter3 x 5,556 ops/sec ±0.87% (83 runs sampled)
#2 [8.82 kB] events x 4,980 ops/sec ±0.95% (85 runs sampled)
#3 [1.68 kB] mittens x 3,602 ops/sec ±0.85% (85 runs sampled)
#4 [3.60 kB] emitter-component x 239 ops/sec ±1.18% (80 runs sampled)
#5 [2.15 kB] tiny-emitter x 232 ops/sec ±1.23% (78 runs sampled)
#6 [3.77 kB] component-emitter x 208 ops/sec ±1.24% (76 runs sampled)
```

### License
[MIT](http://opensource.org/licenses/MIT)
