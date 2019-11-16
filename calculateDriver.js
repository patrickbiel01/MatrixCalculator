function onCalculateClick() {
  let matrix = getInputMatrix();
  let output = document.getElementById("output");
  console.log(CALC_STATE);
  let outputText = ""
  switch (CALC_STATE.trim()) {
    case "Determinant":
      outputText = "\t" + det(matrix);
      break;
    case "Inverse":
      outputText = stringFormat(inverse(matrix));
      break;
    case "GaussianElimantion":
      outputText = stringFormat(rref(matrix));
      break;
    case "Cofactor":
      outputText = stringFormat(cofactorMatrix(matrix));
      break;
    case "Adjugate":
      outputText = stringFormat(adjugate(matrix));
      break;
    case "Rank":
      outputText = "\t" + rank(matrix);
      break;
    case "Transpose":
      outputText = stringFormat(transpose(matrix));
      break;
    default:
      outputText = "Haven't implemented yet :(";
  }

  output.innerHTML = outputText;
}



function getInputMatrix() {
  let matrix = [];

  let tb = document.getElementById("tableBody");
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
  let string = "";

  for (let row = 0; row < matrix.length; row++) {
    string = string.concat("|");
    for (let column = 0; column < matrix[row].length; column++) {
      let entry = "\t" + matrix[row][column].toString() + ",";
      if (column == matrix[row].length-1) { entry += "\t"; }
      string = string.concat(entry);
    }
    string = string.concat("| \n");
  }

  return string;
}
