export default class GridView {
  constructor() {
    this._element = ".card-wrapper";
    this.attribute = [];
    this.stat = {};
  }
  // Method for show GridViewTable
  render() {
    console.log(this.stat);
    let numberCounter = 1;
    const table = document.createElement("table");
    table.classList.add("statistic-table");
    table.id = "table";
    document.querySelector(this._element).appendChild(table);
    let thead = document.createElement("thead");
    table.appendChild(thead);
    let tbody = document.createElement("tbody");
    table.appendChild(tbody);
    let row = document.createElement("tr");
    thead.appendChild(row);
    for (let i = 0; i < this.attribute.length; i++) {
      let tableHeader = document.createElement("th");
      tableHeader.innerHTML = this.attribute[i];
      tableHeader.id = i;
      row.appendChild(tableHeader);
      for (let j = 0; j < this.data.length - 1; j++) {
        let args = [
          numberCounter,
          this.data[i + 1][j].word,
          this.data[i + 1][j].translation,
          this.data[0][i],
          this.stat[this.data[i + 1][j].word].trained,
          this.stat[this.data[i + 1][j].word].correct,
          this.stat[this.data[i + 1][j].word].incorrect,
          this.stat[this.data[i + 1][j].word].percent
        ];
        let tableRow = document.createElement("tr");
        tbody.appendChild(tableRow);
        for (let s = 0; s < 8; s++) {
          let tableData = makeTD(args[s]);
          tableRow.appendChild(tableData);
        }
        numberCounter += 1;
      }
    }
  }
}
function makeTD(value) {
  let td = document.createElement("td");
  if (typeof value === 'number') {
    td.classList.add("number");
    if (value == undefined) {
      td.innerHTML = 0;
    }
  } else if (typeof value === 'string') {
    td.classList.add('string');
  }
  td.innerHTML = value;
  return td;
}