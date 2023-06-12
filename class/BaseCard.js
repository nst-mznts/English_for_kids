export default class BaseCard {
    constructor (imgSrc, imgAlt, id) {
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
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
        img.id = 'img' + this.id;
        img.alt = this.imgAlt;
        card.appendChild(img);
        return card;
    }
}