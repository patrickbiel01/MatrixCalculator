const ERROR_1 = "Incomplete Input Entry";
const ERROR_2 = 'Invalid Matrix Size';

function onCalculateClick() {
  let A = getInputMatrix(1);
  let B = getInputMatrix(2);

  let output = document.getElementById("output");
  let errorContainer = document.getElementById('expError');
  errorContainer.innerHTML = '';
  let inputError1 = document.getElementById('inputError1');
  inputError1.innerHTML = '';
  let inputError2 = document.getElementById('inputError2');
  inputError2.innerHTML = '';

  if (A == ERROR_1) { inputError1.innerHTML = ERROR_1; return; }

  let outputText = ""
  switch (CALC_STATE.trim()) {
    case "Determinant":
      if (!isSquare(A)) { inputError1.innerHTML = ERROR_2; return; }
      outputText = "\t" + det(A);
      break;
    case "Inverse":
      if (!isSquare(A)) { inputError1.innerHTML = ERROR_2; return; }
      outputText = stringFormat(inverse(A));
      break;
    case "Gaussian Elimination":
      outputText = stringFormat(rref(A));
      break;
    case "Cofactor":
      if (!isSquare(A)) { inputError1.innerHTML = ERROR_2; return; }
      outputText = stringFormat(cofactorMatrix(A));
      break;
    case "Adjugate":
      if (!isSquare(A)) { inputError1.innerHTML = ERROR_2; return; }
      outputText = stringFormat(adjugate(A));
      break;
    case "Rank":
      let rowEchelon = rref(A);
      outputText = "\t" + rank(rowEchelon);
      break;
    case "Transpose":
      outputText = stringFormat(transpose(A));
      break;
    case "Matrix Powers":
      if (!isSquare(A)) { inputError1.innerHTML = ERROR_2; return; }
      let exponent = getExponentInput();
      let powered = matrixPow(A, exponent);
      outputText = stringFormat(powered);
      break;
    case "Multiplication":
      if (B == ERROR_1) { inputError2.innerHTML = ERROR_1; return; }
      if (!canMultiply(A,B)) { inputError2.innerHTML = ERROR_2; return; }
      let product = multiply(A, B);
      outputText = stringFormat(product);
      break;
    case "Add":
      if (B == ERROR_1) { inputError2.innerHTML = ERROR_1; return; }
      if (!sameSize(A,B)) { inputError2.innerHTML = ERROR_2; return; }
      let sum = add(A, B);
      outputText = stringFormat(sum);
      break;
    case "Subtract":
      if (B == ERROR_1) { inputError2.innerHTML = ERROR_1; return; }
      if (!sameSize(A,B)) { inputError2.innerHTML = ERROR_2; return; }
      let diff = subtract(A, B);
      outputText = stringFormat(diff);
      break;
    default:
      outputText = "Haven't implemented yet :(";
  }

  output.innerHTML = outputText;
}



function getInputMatrix(tableNum) {
  let matrix = [];

  let tb = document.getElementById("tableBody" + tableNum);
  let children = tb.childNodes;
  for (let i = 0; i < children.length; i++) {
    matrix.push([]);
    let tRow = children[i];
    let inputs = tRow.childNodes;
    for (let j = 0; j < inputs.length; j++) {
      let input = inputs[j].firstChild;
      let number = parseInt(input.value);
      if (Number.isNaN(number)) {
        return ERROR_1;
      }
      matrix[i].push(number);
    }
  }

  return matrix;

}

function stringFormat(matrix) {
  let string = '<table class="outputMatrix"><tbody>';

  for (let row = 0; row < matrix.length; row++) {
    let rowE = "<tr>"
    for (let column = 0; column < matrix[row].length; column++) {
      let columnE = '<td>';
      let entry = "\t" + matrix[row][column].toString();
      if (column == matrix[row].length-1) { entry += "\t"; }
      columnE = columnE.concat(entry, "</td>");
      rowE = rowE.concat(columnE);
    }
    rowE = rowE.concat("</tr>");
    string = string.concat(rowE);
  }

  string = string.concat("</table></tbody>");

  return string;
}
