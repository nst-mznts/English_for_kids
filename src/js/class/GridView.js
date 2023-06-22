export class GridView {
  constructor(attribute, stat) {
    this.attribute = attribute;
    this.stat = stat;
  }
  // Method for show GridViewTable
  render() {
    let wrapper = document.querySelector(".card-wrapper");
    let numberCounter = 1;
    // Create table frame
    let table = this.createDomNode("table", wrapper, "statistic-table");
    table.id = "table";
    let thead = this.createDomNode("thead", table);
    let tbody = this.createDomNode("tbody", table);
    let row = this.createDomNode("tr", thead);
    // Create content for table headers
    this.attribute.forEach((element, index) => {
      let tableHeader = document.createElement("th");
      tableHeader.id = index;
      if (index === 4) {
        this.showHeadersWithIcons(tableHeader, "train-icon", element);
      } else if (index === 5) {
        this.showHeadersWithIcons(tableHeader, "correct-icon", element);
      } else if (index === 6) {
        this.showHeadersWithIcons(tableHeader, "wrong-icon", element);
      } else {
        let thTitle = this.createDomNode("p", tableHeader, "th-title");
        thTitle.innerText = element;
      }
      row.appendChild(tableHeader);
    });
    // Create content for table body
    for (let key in this.stat) {
      let args = [
        numberCounter,
        key,
        this.stat[key].translation,
        this.stat[key].category,
        this.stat[key].trained,
        this.stat[key].correct,
        this.stat[key].incorrect,
        this.stat[key].percent,
      ];
      let tableRow = this.createDomNode("tr", tbody);
      args.forEach((elem) => {
        let tableData = this.makeTD(elem);
        tableRow.appendChild(tableData);
      });
      numberCounter += 1;
    }
  }

  static sortTable(n) {
    let table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.querySelector("#table");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (x.classList.contains("number")) {
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
              shouldSwitch = true;
              break;
            }
          } else if (x.classList.contains("string")) {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        } else if (dir == "desc") {
          if (x.classList.contains("number")) {
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
              shouldSwitch = true;
              break;
            }
          } else if (x.classList.contains("string")) {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  createDomNode(element, wrapper, ...classes) {
    let node = document.createElement(element);
    if ([...classes].length > 0) {
      node.classList.add(...classes);
    }
    if (wrapper) {
      wrapper.append(node);
    }
    return node;
  }

  showHeadersWithIcons(tableHeader, iconClass, content) {
    let thWrapper = this.createDomNode("div", tableHeader, "th-wrapper");
    let thIcon = this.createDomNode("span", thWrapper, "th-icon", iconClass);
    let thTitle = this.createDomNode("p", thWrapper, "th-title", "th-title-hidden");
    thTitle.innerText = content;
  }
  // Create table data
  makeTD(value) {
    let td = document.createElement("td");
    if (typeof value === "number") {
      td.classList.add("number");
    } else if (typeof value === "string") {
      td.classList.add("string");
    }
    td.innerHTML = value;
    return td;
  }
}