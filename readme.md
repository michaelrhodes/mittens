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
[3.42 kB] eventemitter3 x 5,706 ops/s
[4.02 kB] events x 4,717 ops/s
[1.08 kB] mittens x 4,211 ops/s
[0.73 kB] mitt x 1,136 ops/s
[1.05 kB] tiny-emitter x 233 ops/s
[1.68 kB] emitter-component x 226 ops/s
[1.68 kB] component-emitter x 208 ops/s
```

<small>Note: Bundle sizes calculated via `browserify {module-entry} | uglifyjs -cm | wc -c`</small>

### License
[MIT](http://opensource.org/licenses/MIT)
