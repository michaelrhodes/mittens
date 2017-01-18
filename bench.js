var benchmark = require('benchmark')
var ec = require('emitter-component')
var ce = require('component-emitter')
var Tiny = require('tiny-emitter')
var EE3 = require('eventemitter3')
var EE = require('events')
var mittens = require('./')

function test (obj) {
  var i = 10, j = 1000
  while (i--) obj.on('event', function () {})
  while (j--) obj.emit('event', j)
}

benchmark.Suite()
  .add('mittens', function () {
    var obj = {}
    mittens.call(obj)
    test(obj)
  })
  .add('emitter-component', function () {
    var obj = {}
    ec(obj)
    test(obj)
  })
  .add('component-emitter', function () {
    var obj = {}
    ce(obj)
    test(obj)
  })
  .add('tiny-emitter', function () {
    test(new Tiny)
  })
  .add('events', function () {
    test(new EE)
  })
  .add('eventemitter3', function () {
    test(new EE3)
  })
  .on('error', error)
  .on('cycle', cycle)
  .run({ async: true })

function error (e) {
  console.error(e.target.error.stack)
}

function cycle (e) {
  console.log(String(e.target))
}
