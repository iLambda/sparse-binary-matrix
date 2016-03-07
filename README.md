# sparse-binary-matrix
A javascript library for handling sparse binary matrices. This library provides methods to efficiently store sparse binary matrices and
operate computations on them.
This module is available on npm as [sparse-binary-matrix](https://www.npmjs.com/package/sparse-binary-matrix).

## install
If you're using node.js and npm, type into a terminal :
```sh
$ npm install sparse-binary-matrix --save
```

## example
```js
var sbm = require('sparse-binary-matrix')

// create a random sparse matrix of size 100x100
sbm.make(function() { return Math.random() > 0.5 }, { x:100, y:100 })
```

## api

The following methods are available:

#### make
```js
var matrix = sbm.make(source)
```
Creates a sparse binary matrix from the given source : it can be a predicate
depending on (i, j), or row-based binary matrix.

#### matrix
```js
var matrix = sbm.make(sparsematrix)
```
Returns the row-based binary matrix corresponding to the given sparse matrix.

#### check
```js
sbm.check(matrix, i, j)
```
Returns true if the coefficient of the matrix (i, j) is true.

#### identity
```js
var id = sbm.identity(n)
```
Returns the identity matrix of dimension n.

#### zero
```js
var zero = sbm.zero(n)
```
Returns a n dimension matrix full of zeros.

#### transpose
```js
var Tmatrix = sbm.transpose(matrix)
```
Transposes the given matrix.

#### complement
#### not
```js
var matrix = sbm.not(matrix)
           = sbm.complement(matrix)
```
Returns the matrix not(M), where not(M)[i, j] is true if and only if M[i, j]
is false.

#### and

#### or

#### xor
#### add
```js
var matrix = sbm.xor(mA, mB)
           = sbm.add(mA, mB)
```
Returns the sum of both matrices.

#### multiply
```js
var matrix = sbm.multiply(mA, mB)
```
Returns the product of both matrices.

#### pow
```js
var matrix = sbm.pow(matrix, n)
```
Returns the given matrix to power n.

#### isInversible
```js
var is = sbm.isInversible(matrix)
```
Returns true if the matrix is inversible.

#### isSymmetric
```js
var is = sbm.isSymmetric(matrix)
```
Returns true if the matrix is symmetric.


#### density
```js
var density = sbm.density(matrix)
```
Returns the density of the matrix, that is the ratio of true (=1) coefficients over the number of total possible true coefficients for the matrix.


## release History

* 0.1.0 Initial release

## license
[MIT](http://opensource.org/licenses/MIT)
