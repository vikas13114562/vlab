let data = [
  {
    check: '<i class="fa-sharp fa-solid fa-check"></i>',
    "Chemical name": "1 Ammonium Persulfate",
    Vender: "LG Chem",
    "Density (g / m^3)": "3525.92",
    "Viscosity (m^2/s)": "60.63",
    Packaging: "Bag",
    "Pack size": "100.00",
    Unit: "kg",
    Quantity: "6495.18",
  },
  {
    ckeck: '<i class="fa-sharp fa-solid fa-check"></i>',
    "Chemical name": "2 Ammonium Persulfate",
    Vender: "LG Chem",
    "Density (g / m^3)": "3525.92",
    "Viscosity (m^2/s)": "60.63",
    Packaging: "Bag",
    "Pack size": "100.00",
    Unit: "kg",
    Quantity: "6495.18",
  },
  {
    ckeck: '<i class="fa-sharp fa-solid fa-check"></i>',
    "Chemical name": "3 Ammonium Persulfate",
    Vender: "LG Chem",
    "Density (g / m^3)": "3525.92",
    "Viscosity (m^2/s)": "60.63",
    Packaging: "Bag",
    "Pack size": "100.00",
    Unit: "kg",
    Quantity: "6495.18",
  },
];

let newArray;
let isAllSelected = false;

const table = document.getElementById("main-table");
const delete_icon = document.getElementById("delete-icon");
const down_icon = document.getElementById("down");
const up_icon = document.getElementById("up");
const save_btn = document.getElementById('save-btn')

save_btn.addEventListener('click',saveData)

delete_icon.addEventListener("click", handleDelete);
down_icon.addEventListener("click", handleDownOrder);
up_icon.addEventListener("click", handleUpOrder);

function createColumn() {
  let thead = document.createElement("thead");
  let firstRow = document.createElement("tr");
  let col = Object.keys(data[0]);

  for (let i = 0; i < col.length; i++) {
    let td = document.createElement("td");
    if (i == 0) {
      td.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
      td.addEventListener("click", selectAllRow);
    } else td.innerHTML = col[i];
    firstRow.append(td);
  }
  thead.append(firstRow);
  table.append(thead);
}

function creatBody(data) {
  let tbody = document.createElement("tbody");

  for (let i = 0; i < data.length; i++) {
    let bRow = document.createElement("tr");
    // bRow.innerHTML = `<th scope="row">${i+1}</th>`
    let col = Object.keys(data[i]);
    for (let j = 0; j < col.length; j++) {
      let td = document.createElement("td");
      if (j == 0) {
        td.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
        td.id = i;
        td.addEventListener("click", handleClick);
      } else td.innerHTML = data[i][col[j]];
      bRow.append(td);
    }
    tbody.append(bRow);
  }
  table.append(tbody);
}

createColumn();
creatBody(data);

function handleClick(e) {
  let temp = newArray ? [...newArray] : [...data];
  let ele = this;
  ele.classList.toggle("selected");
  let list = document.querySelectorAll(".selected");

  if(list && !delete_icon.classList.contains('red')) delete_icon.classList.add('red')

  // if(list.length == 1 && list[0].id == 0 && up_icon.classList.contains('green')) {
  //   up_icon.classList.remove('green')
  // }

  if (list.length == 1 && list[0].id != 0) {
    up_icon.classList.add("green");
  } else up_icon.classList.remove("green");

  if (list.length == 1 && list[0].id != temp.length - 1)
    down_icon.classList.add("green");
  else down_icon.classList.remove("green");
}

function selectAllRow() {
  this.classList.toggle("selected");
  if(this.classList.contains('selected')) {
    delete_icon.classList.add('red')
    if(up_icon.classList.contains('green')) up_icon.classList.remove('green')
    if(down_icon.classList.contains('green')) down_icon.classList.remove('green')
  }else {
    if(delete_icon.classList.contains('red')) {
      delete_icon.classList.remove('red')
    }
  }

  let len = newArray ? newArray.length : data.length;

  for (let i = 0; i < len; i++) {
    let td = document.getElementById(i);
    if (this.classList.contains("selected")) td.classList.add("selected");
    else td.classList.remove("selected");
  }
}

function handleDelete() {
  let list = document.querySelectorAll(".selected");
  let temp = newArray ? [...newArray] : [...data];

  if (list.length == temp.length + 1) {
    isAllSelected = true;
    table.innerText = "";

    createColumn();
  } else if (list) {
    list.forEach((ele) => {
      let ind = ele.id;

      temp.splice(ind, 1);
      temp.splice(ind, 0, {});
    });
    let res = [];
    temp.forEach((ele) => {
      if (ele.Unit) res.push(ele);
    });
    newArray = [...res];

    table.innerText = "";

    createColumn();
    creatBody(res);
  }
  if(delete_icon.classList.contains('red')) {
    delete_icon.classList.remove('red')
  }
}

function handleDownOrder() {
  let list = document.querySelectorAll(".selected");
  let temp = newArray ? [...newArray] : [...data];
  
  if (
    !isAllSelected &&
    temp.length !== 1 &&
    list.length == 1 &&
    list[0].id != temp.length - 1
  ) {
    let ind = Number(list[0].id);
    let first = temp[ind];
    temp[ind] = temp[ind + 1];
    temp[ind + 1] = first;

    table.innerText = "";

    createColumn();
    creatBody(temp);
    let td = document.getElementById(ind + 1);
    
    if(!up_icon.classList.contains('green')) up_icon.classList.add('green')
    td.classList.add("selected");
    newArray = [...temp];
  }
}

function handleUpOrder() {
  let list = document.querySelectorAll(".selected");
  let temp = newArray ? [...newArray] : [...data];

  if (
    !isAllSelected &&
    temp.length !== 1 &&
    list.length == 1 &&
    list[0].id != 0
  ) {
    let ind = Number(list[0].id);
    let first = temp[ind - 1];
    temp[ind - 1] = temp[ind];
    temp[ind] = first;

    table.innerText = "";

    createColumn();
    creatBody(temp);
    let td = document.getElementById(ind - 1);
    td.classList.add("selected");
    newArray = [...temp];
  }
}

function saveData() {
    let ch = document.getElementById('cname').value;
    let ven = document.getElementById('vendor').value
    let den = document.getElementById('density').value;
    let vis = document.getElementById('viscosity').value
    let pac = document.getElementById('packaging').value;
    let package = document.getElementById('pack').value
    let unit = document.getElementById('unit').value;
    let quantity = document.getElementById('quantity').value

    let newEle = {
        check: '<i class="fa-sharp fa-solid fa-check"></i>',
        "Chemical name": ch,
        Vender: ven,
        "Density (g / m^3)": den,
        "Viscosity (m^2/s)": vis,
        Packaging: pac,
        "Pack size": package,
        Unit: unit,
        Quantity: quantity,
      }

      let temp = newArray ? [...newArray,newEle] : [...data,newEle];
      table.innerText = "";

    createColumn();
    creatBody(temp);
    newArray = [...temp]
}
