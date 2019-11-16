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
      item.onclick = "itemOnClick(" + "i)";
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
