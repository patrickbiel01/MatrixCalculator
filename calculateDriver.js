function onCalculateClick() {
  let A = getInputMatrix(1);
  let B = getInputMatrix(2);

  let output = document.getElementById("output");
  let errorContainer = document.getElementById('expError');
  errorContainer.innerHTML = '';

  let outputText = ""
  switch (CALC_STATE.trim()) {
    case "Determinant":
      outputText = "\t" + det(A);
      break;
    case "Inverse":
      outputText = stringFormat(inverse(A));
      break;
    case "Gaussian Elimination":
      outputText = stringFormat(rref(A));
      break;
    case "Cofactor":
      outputText = stringFormat(cofactorMatrix(A));
      break;
    case "Adjugate":
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
      let exponent = getExponentInput();
      let powered = matrixPow(A, exponent);
      outputText = stringFormat(powered);
      break;
    case "Multiplication":
      let product = multiply(A, B);
      outputText = stringFormat(product);
      break;
    case "Add":
      let sum = add(A, B);
      outputText = stringFormat(sum);
      break;
    case "Subtract":
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
