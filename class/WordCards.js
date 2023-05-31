export class WordCards {
  constructor(imgSrc, imgAlt, titleCard, word, id, dataset) {
    this.imgSrc = imgSrc;
    this.imgAlt = imgAlt;
    this.titleCard = titleCard;
    this.word = word;
    this.id = id;
    this.dataset = dataset;
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
    if (this.titleCard == 0) {
      let titleMain = document.createElement("h3");
      titleMain.classList.add('card-title');
      titleMain.innerText = this.word;
      titleMain.id = 'title'+ this.id;
      card.appendChild(titleMain)
    }  else {
      let titleWrapper = document.createElement("div");
      titleWrapper.classList.add("title-wrapper");
      titleWrapper.classList.add("play-title");
      card.appendChild(titleWrapper);
      let title = document.createElement("h3");
      title.classList.add("card-title");
      title.innerText = this.word;
      title.id = 'title'+ this.id;
      titleWrapper.appendChild(title);
      let btn = document.createElement("div");
      btn.classList.add("rotate");
      btn.id = 'rotate'+ this.id;
      titleWrapper.appendChild(btn);
      let icon = document.createElement("span");
      icon.classList.add("rotate-icon");
      icon.id = this.id;
      icon.setAttribute('data-about', this.dataset);
      btn.appendChild(icon);
    }
    return card;
  }
}