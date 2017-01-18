module.exports = mittens

function mittens (o) {
  o = o || this
  o.emit = emit
  o.off = off
  o.on = on
  return o
}

function emit () {
  this.µ = this.µ || {}
  var ls = this.µ[arguments[0]]
  if (!ls || !ls.length) return
  var a = arguments, al = a.length
  var i = 0, l = ls.length, d = 0, fn
  for (; i < l; i++) {
    if (fn = ls[i]) {
      al == 1 ? fn.call(this) :
      al == 2 ? fn.call(this, a[1]) :
      al == 3 ? fn.call(this, a[1], a[2]) :
      fn.apply(this, slice(arguments, 1))
      continue
    } d++
  }
  if (d) clean(ls)
}

function off (name, fn, i) {
  this.µ = this.µ || {}
  var ls = this.µ[name]
  if (!ls || !ls.length) return
  if (fn && ~(i = ls.indexOf(fn))) ls[i] = null
  if (!fn) this.µ[name] = []
}

function on (name, fn) {
  this.µ = this.µ || {}
  var ls = this.µ[name] = this.µ[name] || []
  if (!~ls.indexOf(fn)) ls[ls.length] = fn
}

function clean (ls, i) {
  while (~(i = ls.indexOf(null)))
    ls.splice(i, 1)
}

function slice (ai, o) {
  if (!ai) return
  var a = [], l = ai.length
  for (o = o || 0; o < l; o++) a[o] = ai[o]
  return a
}
