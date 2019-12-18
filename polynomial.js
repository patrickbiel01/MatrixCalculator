/*
  Polynomial is rep. as Hash Map :
    Key   : exponent
    Value : coefficent
*/
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

function characteristicPolynomial(matrixO) {
  //Convet numeric matric to polynomial matrix: (xI - A)
  var polymat = copy(matrixO);
  for (let i = 0; i < polymat.length; i++) {
    for (let j = 0; j < polymat[i].length; j++) {
      let polyData = { 0:-1*polymat[i][j] };
      if (i == j) { polyData = { 1:1, 0:-1*polymat[i][j] };  }
      polymat[i][j] = polyData;
    }
  }
  //Calculate det for polynomials
  let det = charDet(polymat);

  return det;
}
function charDet(mat) {
  const row = 0;
  let totalDet = {};

  //Matrix is 2x2, Calculate determinant
  if (mat.length == 2) {
    let a = mat[0][0];
    let b = mat[0][1];
    let c = mat[1][0];
    let d = mat[1][1];
    let p1 = multiplyPolynomials([a, d]);
    let p2 = multiplyPolynomials([c, b]);
    let det = subtractPolynomials(p1, p2);
    return det;
  }

  //Matrix is 3x3 or greater; recursively reduce to 2x2
  for (let column = 0; column < mat.length; column += 1) {
    //Generate cofactor
    let cofactor = polycofactorOf(mat, row, column);
    //Calculate determinant for that cofactor
    let subDet = charDet(cofactor);
    let sum = multiplyPolynomials([mat[row][column], subDet]);
    //Alternating, add and subtract the sum
    let negative = (column+1) % 2 == 0;
    if (negative) { sum = multiplyPolynomials([sum, { 0:-1 }]); }
    totalDet = addPolynomials(totalDet, sum);
  }

  return totalDet;
}
function polycofactorOf(matrixO, row, column) {
  let matrix = copy(matrixO);
  for(let i = 0; i < matrix.length; i++) {
    matrix[i].splice(column, 1);
  }
  matrix.splice(row, 1);

  return matrix;
}


/*
  Polynomial Operation Functions
*/

//Function that distributes any number of polynomials
function multiplyPolynomials(polynomials) {
  var prevProduct = null;
  for (let i = 0; i < polynomials.length; i++) {
    let poly = polynomials[i];
    if (i == 0) { continue; }
    if (prevProduct === null) {
      prevProduct = distributeTwoPolynomials(poly, polynomials[i-1]);
      continue;
    }
    prevProduct = distributeTwoPolynomials(prevProduct, poly);
  }

  let fProduct = prevProduct;
  return fProduct;
}
//Sub routine that distributes only 2 polynomials
function distributeTwoPolynomials(p1, p2) {
  let productP = {};

  for (let key1S in p1) {
    //Grab and convert poly1 data to number
    let exp1 = parseInt(key1S);
    let val1 = parseInt(p1[key1S]);

    for (let key2S in p2) {
      //Grab and convert poly2 data to number
      let exp2 = parseInt(key2S);
      let val2 = parseInt(p2[key2S]);
      //Store product of poly1 and poly2
      let newExp = exp1 + exp2;
      if (typeof productP[newExp] === 'undefined') {
        productP[newExp] = val1*val2;
        continue;
      }
      productP[newExp] += val1*val2;
    }
  }

  return productP;
}

//Function that adds any number of polynomials
function addPolynomials(polynomials) {
  let sum = {};
  for (let i = 0; i < polynomials.length; i++) {
    if (i == 0) { continue; }
    let poly = polynomials[i];
    sum = addTwoPolynomials(poly, polynomials[i-1]);
  }
  return sum;
}
function addTwoPolynomials(p1,p2) {
  let sum = {};
  for (let key1 in p1) {
    sum[key1] = p1[key1];
  }
  for (let key2S in p2) {
    //Grab and convert poly2 data to number
    let exp2 = parseInt(key2S);
    let val2 = parseInt(p2[key2S]);
    if (typeof sum[exp2] === 'undefined') {
      sum[exp2] = val2;
      continue;
    }
    sum[exp2] += val2;
  }

  return sum;
}

function multiplyPolynomialBy(k, p) {
  let sum = {};
  for (let key in p) {
    let val = parseInt(p[key]);
    let newVal = k*val;
    sum[key] = newVal;
  }
  return sum;
}

function subtractPolynomials(p1, p2) {
  let nveP2 = multiplyPolynomialBy(-1, p2);
  return addPolynomials([p1, nveP2])
}

/*  END OF: Polynomial Operation Functions  */



/*  Testing   */

let p1 = {
  0: 10,
  2: 1
};
let p2 = {
  0: 10,
  2: 1
};
let product = multiplyPolynomials([p1, p2]);
let sum = addPolynomials([p1, p2]);

console.log(product);
console.log(sum);
console.log("\n");

let A = [
  [1, 1],
  [0, 1]
];
console.log(characteristicPolynomial(A));
