# sparse-binary-matrix
A javascript library for handling sparse binary matrices. This library provides methods to efficiently store sparse binary matrices and
operate computations on them.
This module is available on npm as [sparse-binary-matrix](https://www.npmjs.com/package/sparse-binary-matrix).

This library has been designed in an idea to improve space complexity when storing
those matrices. A simple matrix of size (m, n) holds m\*n coefficients. Assuming
all the matrices are binary (a coefficient can only be 1 or 0), it can store matrices using only d\*m\*n < m\*n coefficients, with 0 < d < 1 being the density of the matrix.

## install
If you're using node.js and npm, type into a terminal :
```sh
$ npm install sparse-binary-matrix --save
```
If you're using the browser, add to the beginning of your file:
```html
<script src="sbm.js"></script>
```

## example
```js
var sbm = require('sparse-binary-matrix')

// create a random sparse matrix of size 100x100 and density of 0.2
sbm.make(function() { return Math.random() < 0.2 }, { x:100, y:100 })
```

## api

The following methods are available:

#### make
```js
var dimension = {x: [number of lines], y: [number of columns]}
var matrix = sbm.make(source, dimension)
```
Creates a sparse binary matrix from the given source : it can be a predicate
depending on (i, j), or a line-based binary matrix.
**You need to specify the dimension only if you provide a predicate as source.**

The time complexity of this method is O(xy)

#### matrix
```js
var matrix = sbm.make(sparsematrix)
```
Returns the row-based binary matrix corresponding to the given sparse matrix.

The time complexity of this method is O(xy)

#### check
```js
sbm.check(matrix, i, j)
```
Returns true if the coefficient of the matrix (i, j) is true.

The time complexity of this method is O(xy)

#### equal
```js
sbm.equal(matrixA, matrixB)
```
Returns true if the matrices are equal.

The time complexity of this method is O(xy²log(y))

#### identity
```js
var id = sbm.identity(n)
```
Returns the identity matrix of dimension n.

The time complexity of this method is O(n)

#### zero
```js
var zero = sbm.zero(x, y)
```
Returns a (x, y) dimension matrix full of zeros.
If only one argument is specified, the matrix will be square.

The time complexity of this method is O(x)

#### one
```js
var one = sbm.one(x, y)
```
Returns a (x, y) dimension matrix full of ones.
If only one argument is specified, the matrix will be square.

The time complexity of this method is O(xy)

#### transpose
```js
var Tmatrix = sbm.transpose(matrix)
```
Transposes the given matrix.

The time complexity of this method is O(x²y)

#### trace
```js
var tr = sbm.trace(matrix)
```
Returns the trace of the given matrix.

The time complexity of this method is O(n²) (x = y = n)

#### complement, not
```js
var matrix = sbm.not(matrix)
           = sbm.complement(matrix)
```
Returns the matrix not(M), where not(M)[i, j] is true if and only if M[i, j]
is false.

The time complexity of this method is O(xy)

#### and

The time complexity of this method is O(xy)

#### or

The time complexity of this method is O(xy)

#### xor, add
```js
var matrix = sbm.xor(mA, mB)
           = sbm.add(mA, mB)
```
Returns the sum of both matrices.

The time complexity of this method is O(xy)

#### multiply
```js
var matrix = sbm.multiply(mA, mB)
```
Returns the product of both matrices.

The time complexity of this method is O((x+y)xy²)

#### pow
```js
var matrix = sbm.pow(matrix, n)
```
Returns the given matrix to power n.

The time complexity of this method is O((x+y)xy²*log(n))

#### isSymmetric
```js
var is = sbm.isSymmetric(matrix)
```
Returns true if the matrix is symmetric.

The time complexity of this method is O(x²y²)

#### popcount
```js
var cnt = sbm.popcount(matrix)
```
Returns the number of true coefficients inside the given matrix.

The time complexity of this method is O(xy)

#### density
```js
var density = sbm.density(matrix)
```
Returns the density of the matrix, that is the ratio of true (=1) coefficients over the number of total possible true coefficients for the matrix.

The time complexity of this method is O(xy)

## release History

* 0.1.0 Initial release

## license
[MIT](http://opensource.org/licenses/MIT)
