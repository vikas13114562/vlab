let data = [
  {
    check: '<i class="fa-sharp fa-solid fa-check"></i>',
    "Chemical name": "Ammonium Persulfate",
    Vender: "LG Chem",
    "Density (g / m^3)": 3525.92,
    "Viscosity (m^2/s)": 60.63,
    Packaging: "Bag",
    "Pack size": 100.0,
    Unit: "kg",
    Quantity: 6495.18,
  },
  {
    check: '<i class="fa-sharp fa-solid fa-check"></i>',
    "Chemical name": "Caustic Potash",
    Vender: "Formosa",
    "Density (g / m^3)": 3772.15,
    "Viscosity (m^2/s)": 48.22,
    Packaging: "Bag",
    "Pack size": 100.0,
    Unit: "kg",
    Quantity: 8751.90,
  },
  {
    check: '<i class="fa-sharp fa-solid fa-check"></i>',
    "Chemical name": "Dimethylaminopropylamino",
    Vender: "LG Chem",
    "Density (g / m^3)": 8435.37,
    "Viscosity (m^2/s)": 12.62,
    Packaging: "Barrel",
    "Pack size": 75.0,
    Unit: "L",
    Quantity: 5964.61,
  },
  {
    check: '<i class="fa-sharp fa-solid fa-check"></i>',
    "Chemical name": "Mono Ammonium Phosphate",
    Vender: "Sinopec",
    "Density (g / m^3)": 1597.65,
    "Viscosity (m^2/s)": 76.51,
    Packaging: "Bag",
    "Pack size": 105.0,
    Unit: "kg",
    Quantity: 8183.73,
  },
  {
    check: '<i class="fa-sharp fa-solid fa-check"></i>',
    "Chemical name": "Ferric Nitrate",
    Vender: "DowDuPont",
    "Density (g / m^3)": 364.04,
    "Viscosity (m^2/s)": 14.90,
    Packaging: "Bag",
    "Pack size": 105.0,
    Unit: "kg",
    Quantity: 4154.33,
  },
  {
    check: '<i class="fa-sharp fa-solid fa-check"></i>',
    "Chemical name": "n-Pentane",
    Vender: "Sinopec",
    "Density (g / m^3)": 4535.26,
    "Viscosity (m^2/s)": 66.76,
    Packaging: "N/A",
    "Pack size": 'N/A',
    Unit: "t",
    Quantity: 6272.34,
  },
  {
    check: '<i class="fa-sharp fa-solid fa-check"></i>',
    "Chemical name": "Glycol Ether PM",
    Vender: "LG Chem",
    "Density (g / m^3)": 6495.18,
    "Viscosity (m^2/s)": 72.12,
    Packaging: "Bag",
    "Pack size": 250.0,
    Unit: "kg",
    Quantity: 8749.54,
  },
  {
    check: '<i class="fa-sharp fa-solid fa-check"></i>',
    "Chemical name": "Caustic Potash",
    Vender: "Formosa",
    "Density (g / m^3)": 3772.15,
    "Viscosity (m^2/s)": 48.22,
    Packaging: "Bag",
    "Pack size": 110.0,
    Unit: "kg",
    Quantity: 8951.90,
  },
];

// function dynamicSort(property) {
//   var sortOrder = 1;
//   if (property[0] === "-") {
//     sortOrder = -1;
//     property = property.substr(1);
//   }
//   return function (a, b) {
//     /* next line works with strings and numbers,
//      * and you may want to customize it to your needs
//      */
//     var result =
//       a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
//     return result * sortOrder;
//   };
// }

let newArray;
let isAllSelected = false;

const table = document.getElementById("main-table");
const delete_icon = document.getElementById("delete-icon");
const down_icon = document.getElementById("down");
const up_icon = document.getElementById("up");
const save_btn = document.getElementById("save-btn");
const refresh = document.getElementById("refresh");

refresh.addEventListener("click", () => {
  window.location.reload();
});

save_btn.addEventListener("click", saveData);

delete_icon.addEventListener("click", handleDelete);
down_icon.addEventListener("click", handleDownOrder);
up_icon.addEventListener("click", handleUpOrder);

function createColumn() {
  let thead = document.createElement("thead");
  let firstRow = document.createElement("tr");
  let col = Object.keys(data[0]);

  for (let i = 0; i < col.length; i++) {
    let td = document.createElement("td");
    td.classList.add("column");
    td.classList.add("change");
    if (i == 0) {
      td.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
      td.id = "icon";
      td.addEventListener("click", selectAllRow);
    } else td.innerHTML = col[i];
    firstRow.append(td);
  }
  thead.append(firstRow);
  table.append(thead);
  let allColumns = document.querySelectorAll(".column");
  let tbody = document.getElementById("tbody");
  allColumns.forEach((ele, ind) => {
    ele.addEventListener("click", handleSort);
  });
}

function creatBody(data) {
  let tbody = document.createElement("tbody");
  tbody.id = "tbody";

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

function handleSort() {
  let temp = newArray ? [...newArray] : [...data];
  let col_name = this.innerText;

  this.classList.toggle("change");

  if (
    col_name == "Density (g / m^3)" ||
    col_name == "Viscosity (m^2/s)" ||
    col_name == "Pack size" ||
    col_name == "Quantity"
  ) {
    if (this.classList.contains("change")) {
      temp.sort((a, b) => b[col_name] - a[col_name]);
    } else temp.sort((a, b) => a[col_name] - b[col_name]);
    let tbody = document.getElementById("tbody");
    tbody.outerHTML = "";
    // createColumn();
    creatBody(temp);
  } else if (this.id != "icon") {
    if (this.classList.contains("change")) {
      temp.sort((a, b) =>
        a[col_name].toLowerCase() > b[col_name].toLowerCase() ? 1 : -1
      );
    } else
      temp.sort((a, b) =>
        a[col_name].toLowerCase() < b[col_name].toLowerCase() ? 1 : -1
      );

    let tbody = document.getElementById("tbody");
    tbody.outerHTML = "";
    // createColumn();
    creatBody(temp);
  }
  newArray = [...temp];
}

function handleClick(e) {
  let temp = newArray ? [...newArray] : [...data];
  let ele = this;
  ele.classList.toggle("selected");
  let list = document.querySelectorAll(".selected");

  if (list && !delete_icon.classList.contains("red"))
    delete_icon.classList.add("red");

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
  if (this.classList.contains("selected")) {
    delete_icon.classList.add("red");
    if (up_icon.classList.contains("green")) up_icon.classList.remove("green");
    if (down_icon.classList.contains("green"))
      down_icon.classList.remove("green");
  } else {
    if (delete_icon.classList.contains("red")) {
      delete_icon.classList.remove("red");
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
  if (delete_icon.classList.contains("red")) {
    delete_icon.classList.remove("red");
  }
}

function handleDownOrder() {
  let list = document.querySelectorAll(".selected");
  let temp = newArray ? [...newArray] : [...data];

  if (
    list.length == 1 &&
    list[0].id == temp.length - 2 &&
    down_icon.classList.contains("green")
  ) {
    down_icon.classList.remove("green");
  }

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

    if (!up_icon.classList.contains("green")) up_icon.classList.add("green");
    td.classList.add("selected");
    newArray = [...temp];
  }
}

function handleUpOrder() {
  let list = document.querySelectorAll(".selected");
  let temp = newArray ? [...newArray] : [...data];

  if (
    list.length == 1 &&
    list[0].id == 1 &&
    up_icon.classList.contains("green")
  ) {
    up_icon.classList.remove("green");
  }

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
  if (
    list.length == 1 &&
    list[0].id != temp.length - 2 &&
    !down_icon.classList.contains("green")
  ) {
    down_icon.classList.add("green");
  }
}

function saveData() {
  let ch = document.getElementById("cname").value;
  let ven = document.getElementById("vendor").value;
  let den = document.getElementById("density").value;
  let vis = document.getElementById("viscosity").value;
  let pac = document.getElementById("packaging").value;
  let package = document.getElementById("pack").value;
  let unit = document.getElementById("unit").value;
  let quantity = document.getElementById("quantity").value;

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
  };

  let temp = newArray ? [...newArray, newEle] : [...data, newEle];
  table.innerText = "";

  createColumn();
  creatBody(temp);
  newArray = [...temp];
}

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

function downloadAsExcel() {
  let temp = newArray ? [...newArray] : [...data];

  let newData = [];

  temp.forEach((ele) => {
    let newEle = {};

    delete ele.check;
    newEle = { ...ele };
    newData.push(newEle);
  });

  const worksheet = XLSX.utils.json_to_sheet(newData);
  const workbook = {
    Sheets: {
      data: worksheet,
    },

    SheetNames: ["data"],
  };

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  saveAsExcel(excelBuffer, "myFile");
}

function saveAsExcel(buffer, filename) {
  const data = new Blob([buffer], { type: EXCEL_TYPE });
  saveAs(data, filename + "export" + new Date().getTime() + EXCEL_EXTENSION);
}
