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
  var a = arguments, ls = this.µ[a[0]] || []
  var fn, d = 0, al = a.length
  var i = 0, l = ls.length
  for (; i < l; i++) {
    (fn = ls[i]) ?
      al == 2 ? fn.call(this, a[1]) :
      fn.apply(this, slice(a, 1)) :
    d++
  }
  if (d) clean(ls)
}

function off () {
  var a = arguments
  var i, name = a[0], fn = a[1]
  if (!name) return this.µ = void 0
  var ls = this.µ[name] || []
  if (fn && ~(i = ls.indexOf(fn))) ls[i] = null
  if (a.length === 1) this.µ[name] = []
}

function on (name, fn) {
  var ls = this.µ[name] = this.µ[name] || []
  if (fn && !~ls.indexOf(fn)) ls[ls.length] = fn
}

function clean (ls, i) {
  while (~(i = ls.indexOf(null)))
    ls.splice(i, 1)
}

function slice (ai, o) {
  var a = [], i = 0, l = ai.length
  for (o = o || 0; i < l; i++)
    a[i] = ai[i + o]
  return a
}
