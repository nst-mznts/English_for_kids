import BaseCard from "./BaseCard.js";
export default class CategoryCards extends BaseCard {
    constructor (imgSrc, imgAlt, word, id) {
        super(imgSrc, imgAlt, word, id);
    }
    render() {
        let card = super.makeCard();
        let titleMain = document.createElement("h3");
        titleMain.classList.add('card-title');
        titleMain.innerText = this.word;
        titleMain.id = 'title'+ this.id;
        card.appendChild(titleMain);
    }
}