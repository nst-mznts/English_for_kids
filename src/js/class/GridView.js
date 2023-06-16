export default class GridView {
  constructor(element, attribute, stat, data) {
    this._element = element;
    this.attribute = attribute;
    this.stat = stat;
    this.data = data;
  }
  // Method for show GridViewTable
  render() {
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
      tableHeader.id = i;
      
      if (i === 4) {
        let thWrapper = document.createElement("div");
        thWrapper.classList.add('th-wrapper');
        tableHeader.appendChild(thWrapper);
        let thIcon = document.createElement("span");
        thIcon.classList.add('th-icon');
        thIcon.classList.add('train-icon');
        thWrapper.appendChild(thIcon);
        let thTitle = document.createElement("p");
        thTitle.classList.add('th-title');
        thTitle.classList.add('th-title-hidden');    
        thTitle.innerText = this.attribute[i];
        thWrapper.appendChild(thTitle);
      } else if (i === 5) {
        let thWrapper = document.createElement("div");
        thWrapper.classList.add('th-wrapper');
        tableHeader.appendChild(thWrapper);
        let thIcon = document.createElement("span");
        thIcon.classList.add('th-icon');
        thIcon.classList.add('correct-icon');
        thWrapper.appendChild(thIcon);
        let thTitle = document.createElement("p");
        thTitle.classList.add('th-title');
        thTitle.classList.add('th-title-hidden');    
        thTitle.innerText = this.attribute[i];
        thWrapper.appendChild(thTitle);
      } else if (i === 6) {
        let thWrapper = document.createElement("div");
        thWrapper.classList.add('th-wrapper');
        tableHeader.appendChild(thWrapper);
        let thIcon = document.createElement("span");
        thIcon.classList.add('th-icon');
        thIcon.classList.add('wrong-icon');
        thWrapper.appendChild(thIcon);
        let thTitle = document.createElement("p");
        thTitle.classList.add('th-title');
        thTitle.classList.add('th-title-hidden');      
        thTitle.innerText = this.attribute[i];
        thWrapper.appendChild(thTitle);
      } else {
        let thTitle = document.createElement("p");
        thTitle.classList.add('th-title');        
        thTitle.innerText = this.attribute[i];
        tableHeader.appendChild(thTitle);
      }
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
          this.stat[this.data[i + 1][j].word].percent,
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
  if (typeof value === "number") {
    td.classList.add("number");
  } else if (typeof value === "string") {
    td.classList.add("string");
  }
  td.innerHTML = value;
  return td;
}