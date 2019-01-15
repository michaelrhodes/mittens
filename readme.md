# mittens

mittens is a really small, really fast event emitter for all browsers

[![build status](https://travis-ci.org/michaelrhodes/mittens.svg?branch=master)](https://travis-ci.org/michaelrhodes/mittens)

## install
```sh
npm install mittens
```

### use
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

// You can also add wildcard event listeners...
obj.on('*', function (name, one) {
  // name === 'event'
  // one === 1
})

// You can remove an event listener...
obj.off('event', console.log)
// or all the listeners of an event...
obj.off('event')
// or all the listeners of all events!
obj.off()

// Now go forth!
```

### benchmark
```js
var i = 10, j = 1000
while (i--) obj.on('event', function () {})
while (j--) obj.emit('event', j)
```

```sh
 [419 B] mittens x 5,189 ops/s
 [870 B] eventemitter3 x 4,785 ops/s
[1039 B] events x 4,103 ops/s
 [290 B] tiny-emitter x 2,554 ops/s
 [374 B] emitter-component x 2,487 ops/s
 [161 B] mitt x 2,307 ops/s
 [384 B] component-emitter x 2,011 ops/s
```

Note: Bundle sizes calculated via `browserify | uglifyjs | brotli`

### obey
[MIT](http://opensource.org/licenses/MIT)
