/*
switch pages
*/
const body = document.body;
import cards from './cards.js';

let wrapper = document.querySelector(".card-wrapper");
let btns = document.querySelectorAll('a');

function getArray(dataset, btn='') {
	let array = [];
	for (let i=0; i<cards[0].length;i++) {
		if (dataset == cards[0][i]) {
      if(!btn=='') {
        btn.classList.add('active');
      }
			array = cards[i+1];
		}
	};
	return array;
};

btns.forEach((btn) => {
	btn.addEventListener('click', () => {
		wrapper.innerHTML = '';
		loadCards(getArray(btn.dataset.about, btn), btn.dataset.about);
	})
});

/**
function getArray(dataset) {
	let array = [];
	for (let i=0; i<cards[0].length;i++) {
		if (dataset == cards[0][i]) {
			array = cards[i+1];
		}
	};
	return array;
};

btns.forEach((btn) => {
	btn.addEventListener('click', () => {
		wrapper.innerHTML = '';
		loadCards(getArray(btn.dataset.about), btn.dataset.about);
	})
});
 */

function loadCards(data, dataset) {
  for (let i = 0; i < 8; i++) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.id = 'card'+i;
	  card.setAttribute('data-about', dataset);
    wrapper.appendChild(card);
    card.addEventListener('mouseout', removeRotation);
    let img = document.createElement("img");
    img.classList.add('card-image');
    img.src = data[i].image;
    card.appendChild(img);
	  let titleWrapper = document.createElement("div");
    titleWrapper.classList.add('title-wrapper');
    card.appendChild(titleWrapper);
    let title = document.createElement("h3");
    title.classList.add('card-title');
    title.innerText = data[i].word.toUpperCase();
	  title.id = 'title'+i;
    titleWrapper.appendChild(title)
	  let btn = document.createElement("div");
    btn.classList.add('rotate');
	  btn.id = 'rotate'+i;
    titleWrapper.appendChild(btn);
	  let icon = document.createElement("span");
    icon.classList.add('rotate-icon');
	  icon.id = i;
	  icon.setAttribute('data-about', dataset);
    btn.appendChild(icon);
	  icon.addEventListener('click', rotation);
  }
};
/*
Rotation cards
*/
const rotateBtns = document.querySelectorAll(".rotate-icon");
const cardsWithWords = document.querySelectorAll(".card");

function rotation() {
  let id = this.id;
  let datas = getArray(this.dataset.about);
  let card = document.getElementById('card'+id);
  card.classList.add('card-rotited');
  let word = document.getElementById('title'+id);
  word.innerText = datas[id].translation.toUpperCase();
  let btn = document.getElementById('rotate'+id);
  btn.style.opacity = '0';
};

rotateBtns.forEach((btn) => {
	btn.addEventListener('click', rotation);
});

function removeRotation(){	
	if (this.classList.contains('card-rotited')) {	
		this.classList.remove('card-rotited');
		let id = this.id[this.id.length - 1];
		let datas = getArray(this.dataset.about);
		let word = document.getElementById('title'+id);
		word.innerText = datas[id].word.toUpperCase();
		let btn = document.getElementById('rotate'+id);
		btn.style.opacity = '1';
	}
};

cardsWithWords.forEach((card) => {
	card.addEventListener('mouseout', removeRotation);
});
/*
Burger menu
*/
const navigation = document.getElementById("mySidenav");
const burger = document.querySelector(".burger");
const background = document.querySelector(".sidenav-background");
const link = document.querySelectorAll(".link");

function openNav() {
  if (burger.classList.contains('burger_active')) {
    closeNav();
  } else {
    burger.classList.add('burger_active');
    navigation.style.width = "300px";
    body.style.overflow = 'hidden';
    background.classList.add('active');
  }
}
  
function closeNav() {
  burger.classList.remove('burger_active');
  navigation.style.width = "0";
  body.style.overflow = '';
  background.classList.remove('active');
}

burger.addEventListener("click", openNav);

document.addEventListener('click', (e) => {
  if(e.target === background) {
    closeNav();
  }
});

link.forEach((element) => {
	element.addEventListener('click', closeNav);
});
/*
Toggle
*/
const toggle = document.querySelector(".switch");
const toggleType = document.querySelector(".toggle");
const train = document.querySelector(".train");
const play = document.querySelector(".play");

function check() {
  if (toggleType.checked) {
    toggleType.checked = false;
    play.style.color = "#ADACAC";
    train.style.color = "#87C159";
    body.style.background = "#F6F6F6";
  } else {
    toggleType.checked = true;
    play.style.color = "#F3C301";
    train.style.color = "#ADACAC";
    body.style.background = "#FEE3A2";
  }
}

toggle.addEventListener("click", check);