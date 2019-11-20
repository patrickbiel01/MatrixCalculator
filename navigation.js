//GLOBAL VARIABLE TO STORE CURRENT STATE
let CALC_STATE = "Determinant";

/* Add Functionality to list items */
function initNavList() {
  let list = document.getElementById('navLinkList');
  let items = list.childNodes;

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    if (item.nodeName == "BUTTON") {
      item.addEventListener('click', function(){
        itemOnClick(i);
      });
    }
  }

  itemOnClick(1);

}
initNavList();


function itemOnClick(clicked) {
  let list = document.getElementById('navLinkList');
  let items = list.childNodes;
  //Grab name from current item, Store user choice in global variable
  CALC_STATE = items[clicked].innerHTML;

  let table2 = document.getElementById("conditionalTable");
  let powerField = document.getElementById("powerField");
  switch (CALC_STATE.trim()) {
    case "Determinant":
      table2.style.display = "none";
      powerField.style.display = "none";
      break;
    case "Inverse":
      table2.style.display = "none";
      powerField.style.display = "none";
      break;
    case "Gaussian Elimination":
      table2.style.display = "none";
      powerField.style.display = "none";
      break;
    case "Cofactor":
      table2.style.display = "none";
      powerField.style.display = "none";
      break;
    case "Adjugate":
      table2.style.display = "none";
      powerField.style.display = "none";
      break;
    case "Rank":
      table2.style.display = "none";
      powerField.style.display = "none";
      break;
    case "Transpose":
      table2.style.display = "none";
      powerField.style.display = "none";
      break;
    case "Matrix Powers":
      table2.style.display = "none";
      powerField.style.display = "block";
      break;
    case "Multiplication":
      table2.style.display = "block";
      powerField.style.display = "none";
      break;
    case "Add":
      table2.style.display = "block";
      powerField.style.display = "none";
      break;
    case "Subtract":
      table2.style.display = "block";
      powerField.style.display = "none";
      break;
    default:
      outputText = "Haven't implemented yet :(";
  }

  //Change colours of all list items
  for (let i = 0; i < items.length; i++) {
    let itemi = items[i];
    if (itemi.nodeName !== "BUTTON") {
      continue;
    }

    if (clicked == i) {
      itemi.id="selected";
    }else {
      itemi.id="";
    }

  }

}
