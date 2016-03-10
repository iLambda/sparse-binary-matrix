var sbm = require('../lib/sbm.js')

/*
1 1 0    1 1 2
1 0 1    2

1 1      1 1
1 0      2 3
0 1
*/

var n = 5
var id = sbm.identity(n)
var zero = sbm.zero(n)
var mat = sbm.make(function (i, j) { return (i + j) % 2 === 0 }, {x: n, y: n})
var mat3 = sbm.make(function (i, j) { return (i + j) % 2 === 0 }, {x: n, y: n})
var mat2 = sbm.make([[1, 1, 0], [1, 0, 1], [0, 1, 1]])

console.log(sbm.matrix(id))
console.log(sbm.matrix(zero))

console.log(sbm.trace(id))
console.log(id.data)

console.log(sbm.equal(mat, mat3))
console.log(sbm.equal(mat, mat2))

console.log(sbm.matrix(mat))
console.log(sbm.matrix(sbm.multiply(id, mat)))
