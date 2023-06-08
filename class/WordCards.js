import BaseCard from "./BaseCard.js";
export default class WordCards extends BaseCard {
  constructor(imgSrc, imgAlt, word, id, dataset) {
    super(imgSrc, imgAlt, word, id);
    this.dataset = dataset;
  }
  render() {
    let card = super.makeCard();
    let titleWrapper = document.createElement("div");
    titleWrapper.classList.add("title-wrapper");
    titleWrapper.classList.add("play-title");
    card.appendChild(titleWrapper);
    let title = document.createElement("h3");
    title.classList.add("card-title");
    title.innerText = this.word;
    title.id = "title" + this.id;
    titleWrapper.appendChild(title);
    let btn = document.createElement("div");
    btn.classList.add("rotate");
    btn.id = "rotate" + this.id;
    titleWrapper.appendChild(btn);
    let icon = document.createElement("span");
    icon.classList.add("rotate-icon");
    icon.id = this.id;
    icon.setAttribute("data-about", this.dataset);
    btn.appendChild(icon);
  }
}