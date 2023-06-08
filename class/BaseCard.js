export default class BaseCard {
    constructor (imgSrc, imgAlt, word, id) {
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
        this.word = word;
        this.id = id;
    }
    makeCard() {
        const card = document.createElement("div");
        card.classList.add("card");
        card.id = 'card'+ this.id;
        document.querySelector(".card-wrapper").appendChild(card);
        let img = document.createElement("img");
        img.classList.add("card-image");
        img.src = this.imgSrc;
        img.alt = this.imgAlt;
        card.appendChild(img);
        return card;
    }
}