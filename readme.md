# mittens

mittens is a really small, really fast event emitter for browsers

[![Build status](https://travis-ci.org/michaelrhodes/mittens.svg?branch=master)](https://travis-ci.org/michaelrhodes/mittens)

## Install

```sh
npm install mittens
```

### Usage

mittens mixes into an object or function

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

### License
[MIT](http://opensource.org/licenses/MIT)
