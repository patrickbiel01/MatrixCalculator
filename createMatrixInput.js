function onGenerateClick() {

  /* Get Size Inputs from Users */

  let input1 = document.getElementById("rowDim");
  let row = parseInt(input1.value);
  if (Number.isNaN(row)) {
    // Throw error to user
  }
  let input2 = document.getElementById("columnsDim");
  let column = parseInt(input2.value);
  if (Number.isNaN(column)) {
    // Throw error to user
  }


  /* Create Table for Matrix Input */

  // Get table container
  let tb = document.getElementById("tableBody");
  // Remove previous matrix
  while (tb.firstChild) {
    tb.removeChild(tb.firstChild);
  }
  //Generate and add table
  for (let i = 0; i < row; i++) {
    let tRow = document.createElement("tr");
    for (let j = 0; j < column; j++) {
      let td = document.createElement('td');
      td.innerHTML = '<input type="text" class="formControl" />';
      tRow.appendChild(td);
    }
    tb.appendChild(tRow);
  }

}
