module.exports = mittens

function mittens (o) {
  o = o || this
  o.emit = emit
  o.off = off
  o.on = on
  return o
}

function emit () {
  var o = this, a = arguments
  o.µ = o.µ || {}
  var n = a[0]
  var fn, ls = o.µ[n] || []
  var d = 0, al = a.length
  var i = 0, l = ls.length
  var as = al > 2 && slice(a, 1)
  for (; i < l; i++) (fn = ls[i]) ?
    as ? fn.apply(o, as) :
    fn.call(o, a[1]) :
    d++
  if (n !== '*' && o.µ['*']) as ?
    emit.apply(o, ['*', n].concat(as)) :
    emit.call(o, '*', n, a[1])
  if (l && d) clean(ls)
}

function off () {
  var o = this, a = arguments
  var i, name = a[0], fn = a[1]
  o.µ = o.µ || {}
  if (!name) return o.µ = {}
  var ls = o.µ[name] || []
  if (fn && ~(i = ndx(ls, fn))) ls[i] = null
  if (a.length === 1) o.µ[name] = []
}

function on (name, fn) {
  var o = this
  o.µ = o.µ || {}
  var ls = o.µ[name] = o.µ[name] || []
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
