var sbm = require('../lib/sbm.js')
var _ = require('lodash')
var test = require('tape-catch')

test('sbm.matrix', function (assert) {
  var mat = [[1, 1, 0], [0, 1, 1], [1, 0, 1]]
  assert.ok(_.isEqual(mat, sbm.matrix(sbm.make(mat))))
  assert.end()
})

test('sbm.identity', function (assert) {
  var i3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
  assert.ok(_.isEqual(i3, sbm.matrix(sbm.identity(3))))
  assert.end()
})

test('sbm.zero', function (assert) {
  var z3 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  assert.ok(_.isEqual(z3, sbm.matrix(sbm.zero(3))))
  assert.end()
})

test('sbm.transpose', function (assert) {
  var mat = [[1, 1, 0], [1, 0, 1]]
  var tmat = [[1, 1], [1, 0], [0, 1]]
  var smat = sbm.make(mat)
  var stmat = sbm.make(tmat)

  /*
  1 1 0      0 0 1
  1 0 1      1

  1 1        0 0
  1 0        1 2
  0 1
  */

  assert.ok(_.isEqual(tmat, sbm.matrix(sbm.transpose(smat))))
  assert.ok(sbm.equal(stmat, sbm.transpose(smat)))
  assert.end()
})

test('sbm.trace', function (assert) {
  assert.equals(sbm.trace(sbm.identity(11)), 11)
  assert.equals(sbm.trace(sbm.identity(5)), 5)
  assert.end()
})

test('sbm.complement|not|and|or|xor|add', function (assert) {
  var n = 5
  var even = sbm.make(function (i, j) { return (i + j) % 2 === 0 }, n)
  var odd = sbm.make(function (i, j) { return (i + j) % 2 === 1 }, n)

  assert.ok(sbm.equal(odd,         sbm.not(even)),      "not")
  assert.ok(sbm.equal(sbm.zero(n), sbm.and(even, odd)), "and")
  assert.ok(sbm.equal(sbm.one(n),  sbm.or(even, odd)),  "or")
  assert.ok(sbm.equal(sbm.one(n),  sbm.xor(even, odd)), "xor")
  assert.end()
})

test('sbm.multiply', function (assert) {
  var n = 5
  var even = sbm.make(function (i, j) { return (i + j) % 2 === 0 }, n)
  var odd = sbm.make(function (i, j) { return (i + j) % 2 === 1 }, n)
  var iN = sbm.identity(n)

  assert.ok(sbm.equal(odd, sbm.multiply(odd, iN)))
  assert.ok(sbm.equal(even, sbm.multiply(even, iN)))
  assert.end()
})

test('sbm.pow', function (assert) {
  var n = 5
  var nil2 = sbm.make(function (i, j) { return n - j + 3 < n - i }, n)
  var zero = sbm.zero(n)
  var id = sbm.identity(n)

  assert.ok(sbm.equal(zero, sbm.pow(nil2, 2)))
  assert.ok(sbm.equal(id, sbm.pow(id, 2)))
  assert.end()
})

test('sbm.isSymmetric', function (assert) {
  var n = 5
  var nil2 = sbm.make(function (i, j) { return n - j + 3 < n - i }, n)
  var zero = sbm.zero(5, 4)
  var id = sbm.identity(n)

  assert.ok(sbm.isSymmetric(id))
  assert.notOk(sbm.isSymmetric(zero))
  assert.notOk(sbm.isSymmetric(nil2))
  assert.end()
})

test('sbm.popcount|density', function (assert) {
  var n = 5
  var sup = sbm.make(function (i, j) { return i >= j }, n)
  var id = sbm.identity(n)

  assert.equals(sbm.popcount(id), n)
  assert.equals(sbm.popcount(sup), (n * (n+1))/2)

  assert.equals(sbm.density(id), 1/n)
  assert.equals(sbm.density(sup), 0.5 * (n+1) / n)

  assert.end()
})
