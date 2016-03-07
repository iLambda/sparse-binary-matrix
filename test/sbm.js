var sbm = require('../lib/sbm.js')

/*
1 1 0    1 1 2
1 0 1    2

1 1      1 1
1 0      2 3
0 1
*/

var n = 3
var id = sbm.make(function(x, y) { return x == y }, {x: n, y: n})
var mat = sbm.make(function (i, j) { return (i + j) % 2 === 0 }, {x: n, y: n})
var mat2 = sbm.make([[1, 1, 0], [1, 0, 1], [0, 1, 1]])

console.log(sbm.matrix(mat))
console.log(sbm.matrix(sbm.multiply(id, mat)))
console.log(" ")
console.log(sbm.matrix(mat2))
console.log(sbm.matrix(sbm.multiply(id, mat2)))
