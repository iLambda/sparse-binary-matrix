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
              mat.data[i].push(j)
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
    // return
    return mat
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

  // power of the matrix
  pow: function(sbm, n) { },

  // returns true if the matrix is inversible
  isInversible: function(sbm) { },
  // returns true if the matrix is symmetric
  isSymmetric: function(sbm) {
    
  },
  // returns the density of the matrix [0; 1]
  density: function(sbm) {
    return _.sum(_.map(sbm.data, function (ar) { return ar.length })) / (sbm.x * sbm.y)
  }
}
