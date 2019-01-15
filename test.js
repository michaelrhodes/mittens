var test = require('tape')
var mittens = require('./')

// note: these tests were shamelessly stolen from
// https://github.com/scottcorgan/tiny-emitter/
// MIT, bitch 💁🏻

test('subscribes to an event', function (t) {
  var emitter = mittens({})
  emitter.on('test', function () {})

  t.equal(emitter.µ.test.length, 1, 'subscribed to event')
  t.end()
})

test('emits an event', function (t) {
  var emitter = mittens({})

  emitter.on('test', function () {
    t.ok(true, 'triggered event')
    t.end()
  })

  emitter.emit('test')
})

test('passes all arguments to event listener', function (t) {
  var emitter = mittens.call({})

  emitter.on('test', function (arg1, arg2) {
    t.equal(arg1, 'arg1', 'passed the first argument')
    t.equal(arg2, 'arg2', 'passed the second argument')
    t.end()
  })

  emitter.emit('test', 'arg1', 'arg2')
})

test('unsubscribes from all events with name', function (t) {
  var emitter = mittens.call({})
  emitter.on('test', function () {
    t.ok(false, 'should not get called')
  })
  emitter.off('test')
  emitter.emit('test')

  process.nextTick(function () {
    t.end()
  })
})

test('unsubscribes single event with name and callback', function (t) {
  var emitter = mittens.call({})
  var fn = function () {
    t.ok(false, 'should not get called')
  }

  emitter.on('test', fn)
  emitter.off('test', fn)
  emitter.emit('test')

  process.nextTick(function () {
    t.end()
  })
})

// Test added by https://github.com/lazd
// From PR: https://github.com/scottcorgan/tiny-emitter/pull/6
test('unsubscribes single event with name and callback when subscribed twice', function (t) {
  var emitter = mittens.call({})
  var fn = function () {
    t.ok(false, 'should not get called')
  }

  emitter.on('test', fn)
  emitter.on('test', fn)

  emitter.off('test', fn)
  emitter.emit('test')

  process.nextTick(function () {
    t.notOk(emitter.µ.test.length, 'removes all events')
    t.end()
  })
})

test('unsubscribes single event with name and callback when subscribed twice out of order', function (t) {
  var emitter = mittens.call({})
  var calls = 0
  var fn = function () {
    t.ok(false, 'should not get called')
  }
  var fn2 = function () {
    calls++
  }

  emitter.on('test', fn)
  emitter.on('test', fn2)
  emitter.on('test', fn)
  emitter.off('test', fn)
  emitter.emit('test')

  process.nextTick(function () {
    t.equal(calls, 1, 'callback was called')
    t.end()
  })
})

test('removes an event inside another event', function (t) {
  var emitter = mittens.call({})

  emitter.on('test', function () {
    t.equal(emitter.µ.test.length, 1, 'event is still in list')

    emitter.off('test')

    t.deepEqual(emitter.µ.test, [], 'event is gone from list')
    t.end()
  })

  emitter.emit('test')
})

test('event is emitted even if unsubscribed in the event callback', function (t) {
  var emitter = mittens.call({})
  var calls = 0
  var fn = function () {
    calls += 1
    emitter.off('test', fn)
  }

  emitter.on('test', fn)

  emitter.on('test', function () {
    console.log('second last one')
    calls += 1
  })

  emitter.on('test', function () {
    calls += 1
  })

  process.nextTick(function () {
    t.equal(calls, 3, 'all callbacks were called')
    t.end()
  })

  emitter.emit('test')
})

test('calling off before any events added does nothing', function (t) {
  var emitter = mittens.call({})
  emitter.off('test', function () {})
  t.end()
})

test('emitting event that has not been subscribed to yet', function (t) {
  var emitter = mittens.call({})

  emitter.emit('some-event', 'some message')
  t.end()
})

test('calling off with an undefined function does nothing', function (t) {
  var emitter = mittens.call({})
  var obj = { fn: function () {}, fn2: function () {}, fn3: void 0 }
  emitter.on('test', obj.fn)
  emitter.on('test', obj.fn2)
  emitter.off('test', obj.fn3)
  t.equal(emitter.µ.test.length, 2, 'nothing was removed')
  emitter.off('test')
  t.equal(emitter.µ.test.length, 0, 'everything was removed')
  t.end()
})

test('emits wildcard event', function (t) {
  var emitter = mittens({})

  emitter.on('*', function (name, first) {
    t.ok(true, 'triggered wildcard event')
    t.equal(name, 'test', 'passed event name as first argument')
    t.equal(first, 1, 'passed first event argument as second argument')
    t.end()
  })

  emitter.emit('test', 1)
})
