export class CategoryCards {
    constructor (id, data, image, alt) {
        this.id = id;
        this.data = data;
        this.image = image;
        this.alt = alt;
    }
    makeCard() {
        let template = '';
        const card = document.createElement("div");
        card.className = 'card main';
        card.id = 'card'+ this.id;
        card.setAttribute("data-about", this.data);
        template += `<img id='img${this.id}' class='card-image' src=${this.image} alt='${this.alt}'>`
        template += `<h3 class='card-title' id='title${this.id}'>${this.data.toUpperCase()}</h3>`  
        card.innerHTML = template;
        return card;
    }
}