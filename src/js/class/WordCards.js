export default class WordCards {
  constructor(id, data) {
    this.id = id;
    this.data = data;
  }

  makeCard() {
    let template = '';
    const card = document.createElement('div');
    card.className = 'card play-card';
    card.id = 'card' + this.id;
    template += `<img id='img${this.id}' class='card-image play-image' src=${this.data.image} alt='${this.data.word}'>`;
    template += `<div class='title-wrapper play-title'>`;
    template += `<h3 class='card-title' id='title${this.id}' data-translation=${
      this.data.translation
    }>${this.data.word.toUpperCase()}</h3>`;
    template += `<div id='rotate${this.id}' class='rotate'>`;
    template += `<img class='rotate-icon' src='./src/assets/img/icons/rotate.svg' alt='rotate-icon'>`;
    template += `</div>`;
    template += `<audio id='audio${this.id}' src=${this.data.audioSrc} data-word='${this.data.word}'></audio>`;
    template += `</div>`;
    card.innerHTML = template;
    return card;
  }
}