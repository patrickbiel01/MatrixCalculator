/*
  Polynomial is rep. as Hash Map :
    Key   : exponent
    Value : coefficent
*/

function lambdaDet(matrix) {
  let lambdaMat = Identity(matrixO.length);
  for (let i = 0; i < matrix.length; i++) {
     lambdaMat[i][i] = matrix[i][i];
  }

  let cMat = copy(matrix);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i][i] = 0;
  }

  //Matrix is 2x2, Calculate determinant
  if (matrix.length == 2) {
    let a = matrix[0][0];
    let b = matrix[0][1];
    let c = matrix[1][0];
    let d = matrix[1][1];
    let p1 = multiplyPolynomial([[1,0],[1,a]], [[1,0],[1,d]]);
    let polyData = subtractPolynomial(p1, [[0],[c*b]]);
    return polyData;
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

  return [coeffs, exps];
}


/*
  Polynomial Operation Functions
*/

//Function that distributes any number of polynomials
function distributePolynomials(polynomials) {
  var prevProduct = null;
  for (let i = 0; i < polynomials.length; i++) {
    let poly = polynomials[i];
    if (i == 0) { continue; }
    if (prevProduct === null) {
      prevProduct = multiplyTwoPolynomials(poly, polynomials[i-1]);
      continue;
    }
    prevProduct = multiplyTwoPolynomials(prevProduct, poly);
  }

  let fProduct = prevProduct;
  return fProduct;
}
//Sub routine that distributes only 2 polynomials
function multiplyTwoPolynomials(p1, p2) {
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

function multiplyPolynomialBy(k, polynomials) {
  let sum = {};
  for (let key in p) {
    let val = parseInt(p[key]);
    let newVal = k*val;
    sum[key] = newVal;
  }
  return sum;
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
let product = distributePolynomials([p1, p2]);
let sum = addPolynomials([p1, p2]);

console.log(product);
console.log(sum);
