/*
      - Vector Operations
*/

const X = 0;
const Y = 1;
const Z = 2;
function dotProductof(vector1O, vector2O) {
  let vector1 = copy(vector1O);
  let vector2 = copy(vector2O);

  let sum = 0
  for (let i = 0; i < vector1.length; i++) {
    sum += vector1[i] * vector2[i];
  }

  return sum;
}


function crossProductof(vector1O, vector2O) {
  let v1 = copy(vector1O);
  let v2 = copy(vector2O);

  let crossV = [
    v1[Y] * v2[Z] - v1[Z] * v2[Y],
    v1[Z] * v2[X] - v1[X] * v2[Z],
    v1[X] * v2[Y] - v1[Y] * v2[X]
  ];

  return crossV;
}



/*
      - Matrix Operations
*/

/* Function that generates the cofactor pattern
    - Elimates a corresponding row & column of a position
*/
function getCofactorFrom(matrixO, row, column) {
  let matrix = copy(matrixO);
  for(let i = 0; i < matrix.length; i++) {
    matrix[i].splice(column, 1);
  }
  matrix.splice(row, 1);

  return matrix;
}

/* Calling function that outlines general
    logic of calculating determinant */
function det(matrix) {

  //Matrix is 2x2, Calculate determinant
  if (matrix.length == 2) {
    let a = matrix[0][0];
    let b = matrix[0][1];
    let c = matrix[1][0];
    let d = matrix[1][1];
    return a*d - c*b;
  }

  const row = 0;

  //Matrix is 3x3 or greater; recursively reduce to 2x2
  let totalDet = 0;
  for (let column = 0; column < matrix.length; column += 1) {
    //Generate cofactor
    let cofactor = getCofactorFrom(matrix, row, column);
    //Calculate determinant for that cofactor
    let subDet = det(cofactor);
    let sum = matrix[row][column] * subDet;
    //Alternating, add and subtract the sum
    let negative = (column+1) % 2 == 0;
    if (negative) { sum *= -1; }
    totalDet += sum;
  }

  return totalDet;
}


function Identity(n) {
  var identity = [];
  let nZero = []
  for (let i = 0; i < n; i++) {
    nZero.push(0);
  }
  for (let i = 0; i < n; i++) {
    identity.push(copy(nZero));
    identity[i][i] = 1;
  }

  return identity;
}

function getColumnVectorFrom(matrixO, c) {
  let matrix = copy(matrixO);
  let cVector = [];

  for (let row = 0; row < matrix.length; row++) {
    cVector.push(matrix[row][c]);
  }

  return cVector;
}


function add(matrix1O, matrix2O) {
  let matrix1 = copy(matrix1O);
  let matrix2 = copy(matrix2O);
  let sumMatrix = [];

  for(let i = 0; i < matrix1.length; i++) {
    sumMatrix.push([]);
    for(let j = 0; j < matrix1[1].length; j++) {
      sumMatrix[i].push(matrix1[i][j] + matrix2[i][j]);
    }
  }

  return sumMatrix
}

function subtract(matrix1O, matrix2O) {
  let matrix2 = multiplyByConstant(-1, matrix2O);
  return add(matrix1O, matrix2);
}


function multiplyByConstant(k, matrixO) {
  let matrix = copy(matrixO);
  let transformMatrix = [];

  for(let i = 0; i < matrix.length; i++) {
    transformMatrix.push([]);
    for(let j = 0; j < matrix[1].length; j++) {
      transformMatrix[i].push(k*matrix[i][j]);
    }
  }

  return transformMatrix;
}


function multiply(matrix1O, matrix2O) {
  let matrix1 = copy(matrix1O);
  let matrix2 = copy(matrix2O);
  let transformMatrix = [];

  for (let i = 0; i < matrix1.length; i++) {
    transformMatrix.push([]);
    let v1 = matrix1[i];
    for (let j = 0; j < matrix2[0].length; j++) {
      let v2 = getColumnVectorFrom(matrix2, j);
      let element = dotProductof(v1, v2);
      transformMatrix[i].push(element);
    }

  }

  return transformMatrix;
}


//Transpose
function transpose(matrixO) {
  let matrix = copy(matrixO);
  let transpose = [];

  let height = matrix.length;
  let width = matrix[0].length;
  for (let column = 0; column < width; column++) {
    transpose.push([]);
    for (let row = 0; row < height; row++) {
      transpose[column].push(matrix[row][column]);
    }
  }

  return transpose;
}


function cofactorMatrix(matrixO) {
  let matrix = copy(matrixO);
  let cofactors = [];

  if (matrix.length == 2) {
    return [
      [matrix[1][1], -1*matrix[0][1]],
      [-1*matrix[1][0], matrix[0][0]]
    ];
  }

  for (let i = 0; i < matrix.length; i++) {
    cofactors.push([]);
    for (let j = 0; j < matrix[i].length; j++) {
      let cofactor = getCofactorFrom(matrix, i, j);
      let result = det(cofactor);
      result *= Math.pow(-1, i+j);
      cofactors[i].push(result);
    }
  }

  return cofactors;
}


function adjugate(matrixO) {
  let cofactors = cofactorMatrix(matrixO);
  return transpose(cofactors);
}


function inverse(matrixO) {
  let determinant = det(matrixO);
  if (determinant == 0) { throw "Matrix is not invertable"; }
  let inverse = multiplyByConstant(
    1/determinant, adjugate(matrixO)
  );

  return inverse
}

function isEqual(matrix1, matrix2) {
  let equality = true;
  if (matrix1.length != matrix2.length || matrix1[0].length != matrix2[0].length) {
    return false
  }

  for (let i = 0; i < matrix1.length; i++) {
    for (let j = 0; j < matrix1[i].length; j++) {
      if (matrix1[i][j] != matrix2[i][j]) {
        equality = false;
      }
    }
  }

  return equality;
}


function orthogonal(matrixO) {
  if (matrixO.length != matrixO[0].length) {
    return false
  }
  let transposeProduct = multiply(transpose(matrixO), matrixO);
  return isEqual(transposeProduct, Identity(matrixO.length));
}

function skewSymmteric(matrixO) {
  if (matrixO.length != matrixO[0].length) {
    return false
  }
  return isEqual(matrixO, multiplyByConstant(-1, transpose(matrixO)));
}

function symmteric(matrixO) {
  if (matrixO.length != matrixO[0].length) {
    return false
  }
  return isEqual(matrixO, transpose(matrixO));
}


//Gaussian Elimantion
function rref(matrixO) {
  let matrix = copy(matrixO);
/*
  for (let i = 0; i < matrix[0].length; i++) {
    for (let row = i; row < matrix.length; row++) {
      let a = matrix[row][i];
      if (a == 0) { continue; }
    }
  }
*/
}

//Power to N

//Eigenvalue and Eigen Vector



/*
    -----   TESTING   -----
*/

let A = [
  [1, -1, 2],
  [0, -3, 1],
  [0, -3, 1]
];
let B = Identity(3);

let C = multiply(A,B);
console.log(C);

let D = [
  [2, -1, 3, 0],
  [-3, 1, 0, 4],
  [-2, 1, 4, 1],
  [-1, 3, 0, -2]
];
console.log("\n");
console.log(det(D));

let E = [
  [3, 0, 2],
  [2, 0 , -2],
  [0, 1, 1]
];
console.log(inverse(E));

let F = [
  [0, 11, 4],
  [0, 0, 77],
  [0, 0, 0]
];
console.log(inverse(F));





//Utility

/* Utility Function used to entirely copy over 2-D arrays to new pointer */
function copy(aObject) {
  if (!aObject) {
    return aObject;
  }
  let v;
  let bObject = Array.isArray(aObject) ? [] : {};
  for (const k in aObject) {
    v = aObject[k];
    bObject[k] = (typeof v === "object") ? copy(v) : v;
  }
  return bObject;
}
