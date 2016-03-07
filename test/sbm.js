var sbm = require('../lib/sbm.js')

/*
1 1 0    1 1 2
1 0 1    2

1 1      1 1
1 0      2 3
0 1
*/

var mat = sbm.make([[1, 1, 0], [1, 0, 1]])
console.log(sbm.matrix(mat))
console.log(mat.data)
console.log(sbm.transpose(mat).data)
console.log(sbm.density(sbm.transpose(mat)))
