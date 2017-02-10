module.exports = mittens

function mittens (o) {
  o = o || this
  o.emit = emit
  o.off = off
  o.on = on
  o.µ = {}
  return o
}

function emit () {
  var o = this, a = arguments
  var fn, ls = o.µ[a[0]] || []
  var d = 0, al = a.length
  var i = 0, l = ls.length
  for (; i < l; i++) {
    (fn = ls[i]) ?
      al == 2 ? fn.call(o, a[1]) :
      fn.apply(o, slice(a, 1)) :
    d++
  }
  if (d) clean(ls)
}

function off () {
  var o = this, a = arguments
  var i, name = a[0], fn = a[1]
  if (!name) return o.µ = {}
  var ls = o.µ[name] || []
  if (fn && ~(i = ndx(ls, fn))) ls[i] = null
  if (a.length === 1) o.µ[name] = []
}

function on (name, fn) {
  var ls = this.µ[name] = this.µ[name] || []
  if (fn && !~ndx(ls, fn)) ls[ls.length] = fn
}

function clean (ls, i) {
  while (~(i = ndx(ls, null)))
    ls.splice(i, 1)
}

function slice (ai, o) {
  o = o || 0
  var a = [], i = 0, l = ai.length - o
  for (; i < l; i++) a[i] = ai[i + o]
  return a
}

function ndx (ai, x) {
  var i = 0, l = ai.length
  for (; i < l; i++) if (ai[i] === x) return i
  return -1
}
