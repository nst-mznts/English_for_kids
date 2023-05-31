export class GridView {
  /**
   * properties
   * @param [array] data
   * @param [array] attribute
   * @param 'string' _element
   * @param {object} stat
   */

  constructor() {
    this._element = '.card-wrapper';
    this.attribute = [];
  }
  /**
   * Method for show GridViewTable
   */
  render() {
    console.log(this.stat);
    let numberCounter = 1;
    // show table
    const table = document.createElement("table");
    table.classList.add("statistic-table");
    let row = document.createElement("tr");
    table.appendChild(row);
    // draw table
    for (let i = 0; i < this.attribute.length; i++) {
      let tableHeader = document.createElement("th");
      tableHeader.innerHTML = this.attribute[i];
      row.appendChild(tableHeader);
      for (let j = 0; j < this.data.length - 1; j++) {
        let tableRow = document.createElement("tr");
        table.appendChild(tableRow);
        let tableDataCounter = document.createElement("td");
        tableDataCounter.innerHTML = numberCounter;
        tableRow.appendChild(tableDataCounter);
        let tableDataWord = document.createElement("td");
        tableDataWord.innerHTML = this.data[i + 1][j].word;
        tableRow.appendChild(tableDataWord);
        let tableDataTranslation = document.createElement("td");
        tableDataTranslation.innerHTML = this.data[i + 1][j].translation;
        tableRow.appendChild(tableDataTranslation);
        let tableDataCatrgory = document.createElement("td");
        tableDataCatrgory.innerHTML = this.data[0][i];
        tableRow.appendChild(tableDataCatrgory);
        let tableDataTrained = document.createElement("td");
        if (this.stat[this.data[i + 1][j].word] == undefined) {
          tableDataTrained.innerHTML = 0;
        } else {
          tableDataTrained.innerHTML = this.stat[this.data[i + 1][j].word].trained;
        }
        tableRow.appendChild(tableDataTrained);
        let tableDataCorrect = document.createElement("td");
        if (this.stat[this.data[i + 1][j].word] == undefined) {
          tableDataCorrect.innerHTML = 0;
        } else {
          tableDataCorrect.innerHTML = this.stat[this.data[i + 1][j].word].correct;
        }        
        tableRow.appendChild(tableDataCorrect);
        let tableDataIncorrect = document.createElement("td");
        if (this.stat[this.data[i + 1][j].word] == undefined) {
          tableDataIncorrect.innerHTML = 0;
        } else {
          tableDataIncorrect.innerHTML = this.stat[this.data[i + 1][j].word].incorrect;
        }
        tableRow.appendChild(tableDataIncorrect);
        let tableDataStat = document.createElement("td");
        tableDataStat.innerHTML = 0;
        tableRow.appendChild(tableDataStat);
        numberCounter += 1;
      }
    }
    document.querySelector(this._element).appendChild(table);
  }
}