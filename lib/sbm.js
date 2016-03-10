var _ = require('lodash')

module.exports = {
  // creates a sparse binary matrix
  make: function(source, dimension) {
    // create the matrix
    var mat = {}
    // source can be a 2-var predicate function or a line based matrix
    if (_.isFunction(source)
        && dimension
        && _.isInteger(dimension.x)
        && _.isInteger(dimension.y)) {
          // creating the matrix
          mat.x = dimension.x
          mat.y = dimension.y
          mat.data = []
          // populate
          for (var i = 0; i < mat.x; i++) {
            mat.data.push([])
            for (var j = 0; j < mat.y; j++) {
              if (source(i, j)) {
                mat.data[i].push(j)
              }
            }
          }
    } else if (_.isArray(source) && source[0] && _.isArray(source[0])) {
      // creating the matrix
      mat.x = source.length
      mat.y = source[0].length
      mat.data = []
      // populate
      for (var i = 0; i < mat.x; i++) {
        mat.data.push([])
        for (var j = 0; j < mat.y; j++) {
          if (source[i][j]) {
            mat.data[i].push(j)
          }
        }
      }
    }
    // return the matrix
    return mat
  },
  // returns the sbm in line-based matrix form
  matrix: function(sbm) {
    // creating matrix
    var mat = []
    // populate
    for (var i = 0; i < sbm.x; i++) {
      mat.push([])
      for (var j = 0; j < sbm.y; j++) {
        mat[i][j] = _.includes(sbm.data[i], j) ? 1 : 0
      }
    }
    // return the matrix
    return mat
  },

  // check if the coefficient in i, j is true
  check: function (sbm, i, j) {
    return _.includes(sbm.data[i], j)
  },

  // returns the identity matrix for a given dimension
  identity: function(n) {
    return {
      x: n,
      y: n,
      data: _.map(_.range(n), function (num) {
        return [num]
      })
    }
  },

  zero: function(n) {
    return {
      x: n,
      y: n,
      data: _.map(_.range(n), function (num) {
        return []
      })
    }
  },

  // computes the trace of the matrix
  trace: function(matrix) {
    // if not square
    if (matrix.x != matrix.y) {
      return
    }
    // return trace
    return _.filter(matrix.data, function (line, number) {
      return _.includes(line, number)
    }).length
  },

  // transposes the matrix
  transpose: function(sbm) {
    // create the matrix
    var mat = {}
    mat.x = sbm.y
    mat.y = sbm.x
    mat.data = []
    // populate
    for (var i = 0; i < mat.x; i++) {
      mat.data.push([])
      for (var j = 0; j < mat.y; j++) {
        if (_.includes(sbm.data[j], i)) {
            mat.data[i].push(j)
        }
      }
    }
    return mat
  },
  // complements the matrix
  complement: function(sbm) { return this.not(sbm) },
  // are both matrices equal ?
  equal: function(sbmA, sbmB) {
    // check size
    if (sbmA.x !== sbmB.x || sbmA.y !== sbmB.y) {
      return false
    }

    // check
    return _.every(sbmA.data, function (line, idx) {
      return _.isEqual(line, sbmB.data[idx])
    })
  },

  // NOT the matrix
  not: function(sbm) {
    // create the matrix
    var mat = {}
    mat.x = sbm.x
    mat.y = sbm.y
    mat.data = []
    // populate
    for (var i = 0; i < mat.x; i++) {
      mat.data[i] = _.difference(_.range(mat.y), mat.data[i])
    }
    // return matrix
    return mat
  },
  // AND the two matrices
  and: function(sbmA, sbmB) {
    // if not the same sizes
    if (sbmA.x != sbmB.x || sbmA.y != sbmB.y) {
      return
    }
    // create the matrix
    var mat = {}
    mat.x = sbm.x
    mat.y = sbm.y
    mat.data = []
    // populate
    for (var i = 0; i < mat.x; i++) {
      mat.data[i] = _.intersection(sbmA.data[i], sbmA.data[i])
    }
    // return matrix
    return mat
  },
  // OR the two matrices
  or: function(sbmA, sbmB) {
    // if not the same sizes
    if (sbmA.x != sbmB.x || sbmA.y != sbmB.y) {
      return
    }
    // create the matrix
    var mat = {}
    mat.x = sbm.x
    mat.y = sbm.y
    mat.data = []
    // populate
    for (var i = 0; i < mat.x; i++) {
      mat.data[i] = _.union(sbmA.data[i], sbmA.data[i])
    }
    // return matrix
    return mat
  },
  // XOR the two matrices
  xor: function(sbmA, sbmB) {
    // if not the same sizes
    if (sbmA.x != sbmB.x || sbmA.y != sbmB.y) {
      return
    }
    // create the matrix
    var mat = {}
    mat.x = sbm.x
    mat.y = sbm.y
    mat.data = []
    // populate
    for (var i = 0; i < mat.x; i++) {
      mat.data[i] = _.xor(sbmA.data[i], sbmA.data[i])
    }
    // return matrix
    return mat
  },

  // add two matrices
  add: function(sbmA, sbmB) { return this.xor(sbmA, sbmB) },
  // multiply two matrices
  multiply: function(sbmA, sbmB) {
    // check if size compatible
    if (sbmA.y !== sbmB.x) {
      return
    }
    // create a new matrix
    return this.make((function (i, j) {
      return _.reduce(_.map(_.range(sbmA.y), (function(id) {
        return this.check(sbmA, i, id) && this.check(sbmB, id, j)
      }).bind(this)), function (sum, a) {
        return sum ^ a
      }) == 1
    }).bind(this), { x: sbmA.x, y: sbmB.y })
  },
  // power of the matrix
  pow: function(sbm, n) {
    if (n == 0) {
      return this.identity(n)
    } else if (n == 1) {
      return sbm
    } else if (n % 2 == 0) {
      return this.pow(this.multiply(sbm, sbm), n/2)
    } else {
      return this.multiply(sbm, this.pow(this.multiply(sbm, sbm), (n-1)/2))
    }
  },

  // returns true if the matrix is inversible
  isInversible: function(sbm) {

  },
  // returns true if the matrix is symmetric
  isSymmetric: function(sbm) {
    // if the matrix ain't square, symmetry is off
    if (sbm.x !== sbm.y) {
      return false
    }

    // symmetry status
    var symmetry = true
    // iterate
    for (var i = 0; i < sbm.x; i++) {
      for (var j = 0; j <= i; j++) {
        symmetry = symmetry && ((_.includes(sbm.data[i], j) ^ _.includes(sbm.data[j], i)) === 0)
      }
    }
    // return
    return symmetry
  },
  // returns the density of the matrix
  density: function(sbm) {
    return _.sum(_.map(sbm.data, function (ar) { return ar.length })) / (sbm.x * sbm.y)
  }
}
