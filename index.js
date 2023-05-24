/*
switch pages
*/
const body = document.body;
import cards from './cards.js';

let wrapper = document.querySelector(".card-wrapper");
let menuLinks = document.querySelectorAll('a');
let logo = document.querySelector(".logo");
mainPage();

function loadCards(data, dataset = 'Main') {
  for (let i = 0; i < 8; i++) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.id = 'card'+i;	  
    wrapper.appendChild(card);
    if (dataset == "Main") {
      card.classList.add('main');
      card.setAttribute('data-about', cards[0][i]);
      card.addEventListener('click', changePage);
      let img = document.createElement("img");
      img.classList.add('card-image');
      img.src = cards[i+1][6].image;
      card.appendChild(img);
      let title = document.createElement("h3");
      title.classList.add('card-title');
      title.innerText = data[i].toUpperCase();
      title.id = 'title'+i;
      card.appendChild(title)
    } else {
      card.classList.add('play-card');
      card.setAttribute('data-about', dataset);
      card.addEventListener('mouseleave', removeRotation);
      //card.addEventListener('click', playAudio);
      let img = document.createElement("img");
      img.classList.add('card-image');
      img.classList.add('play-image');
      img.src = data[i].image;
      img.alt = data[i].word;
      img.addEventListener('click', handleCardClick);
      card.appendChild(img);
      let titleWrapper = document.createElement("div");
      titleWrapper.classList.add('title-wrapper');
      titleWrapper.classList.add('play-title');
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
  }
};

function getArray(dataset) {
	let array = [];
	for (let i=0; i<cards[0].length;i++) {
    if (dataset == cards[0][i]) {
      array = cards[i+1];
    } else if (dataset == "Main") {
      array = cards[0];
    }
	}
  return array;
};

function changePage() {
  let arr = document.querySelectorAll('a');
  for (let i=0; i<arr.length; i++) {
    arr[i].classList.remove('active');
    if (arr[i].dataset.about == this.dataset.about) {
      arr[i].classList.add('active');
    }
  }
  wrapper.innerHTML = '';
  loadCards(getArray(this.dataset.about), this.dataset.about);
};

menuLinks.forEach((link) => {
	link.addEventListener('click', changePage);
});
/*
Rotation cards
*/
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
/*
Audio
*/
function playAudio() {
  let id = this.id[this.id.length - 1];
  let datas = getArray(this.dataset.about);
  if (!this.classList.contains('card-rotited')) {
    let audio = new Audio();
    audio.src = datas[id].audioSrc;
    audio.play();
  }
}
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
const footer = document.querySelector("footer");
const startButton = document.querySelector(".start");


function check() {
  if (toggleType.checked) {
    toggleType.checked = false;
    play.style.color = "#ADACAC";
    train.style.color = "#87C159";
    footer.style.height = "0";
    startButton.style.display = "none";
    document.querySelectorAll(".play-title").forEach((element) => {
      element.style.display = "flex";
    });
    document.querySelectorAll(".play-image").forEach((img) => {
      img.style.width = "323px";
      img.style.height = "215px";
    });
    document.querySelectorAll(".play-card").forEach((card) => {
      card.style.height = "290px";
    });
  } else {
    toggleType.checked = true;
    play.style.color = "#F3C301";
    train.style.color = "#ADACAC";
    footer.style.height = "60px";
    startButton.style.display = "flex";
    document.querySelectorAll(".play-title").forEach((element) => {
      element.style.display = "none";
    });
    document.querySelectorAll(".play-image").forEach((img) => {
      img.style.width = "343px";
      img.style.height = "235px";
    });
    document.querySelectorAll(".play-card").forEach((card) => {
      card.style.height = "235px";
    });
  }
}

toggle.addEventListener("click", check);
startButton.addEventListener("click", StartGame);
/*
Start the game
*/
let starsWrapper = document.querySelector(".stars-wrapper");
const startIcon = document.querySelector(".start-icon");
let currentIndex = 0;
let audioElement = null;
let wrongAnswers = [];

function StartGame() {
  startIcon.style.backgroundImage = "url('../../img/icons/repeat.svg')";
  let dataAttribute = document.querySelector("a.active").dataset.about;
  let array = getArray(dataAttribute);

  if (audioElement === null) {
    audioElement = new Audio();
  }
  audioElement.src = array[currentIndex].audioSrc;
  audioElement.play();
}


function handleCardClick(event) {
  let dataAttribute = document.querySelector("a.active").dataset.about;
  let array = getArray(dataAttribute);
  const clickedImg = event.target;
  const clickedWord = event.target.getAttribute('alt');

  if (clickedWord === array[currentIndex].word) {
    clickedImg.style.opacity = "0.5";
    let starWin = document.createElement("img");
    starWin.classList.add('star');
    starWin.src = './img/icons/star-win.svg';
    starWin.alt = 'star';
    starsWrapper.appendChild(starWin);
    let correctAudio = new Audio();
    correctAudio.src = './audio/correct.mp3';
    correctAudio.play();
    currentIndex++;

    if (currentIndex < array.length) {
      setTimeout(StartGame, 2000);
    } else {
      audioElement = null;
      setTimeout(EndTheGame, 2000);
    }
  } else {
    wrongAnswers.push(array[currentIndex].word);
    console.log(wrongAnswers);
    let star = document.createElement("img");
    star.classList.add('star');
    star.src = './img/icons/star.svg';
    star.alt = 'star';
    starsWrapper.appendChild(star);
    let errorAudio = new Audio();
    errorAudio.src = './audio/error.mp3';
    errorAudio.play();
  }
}

const cardElements = document.querySelectorAll('.play-image');

cardElements.forEach(function(cardElement) {
  cardElement.addEventListener('click', handleCardClick);
});

/*
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
*/
function EndTheGame() {
  starsWrapper.innerHTML = '';
  wrapper.innerHTML = '';
  startIcon.style.backgroundImage = "url('../../img/icons/play.svg')";
  const resultWrapper = document.createElement("div");
  resultWrapper.classList.add('result-wrapper');
  wrapper.appendChild(resultWrapper);
  if (wrongAnswers.length === 0) {
    let successAudio = new Audio();
    successAudio.src = './audio/success.mp3';
    successAudio.play();
    resultWrapper.innerHTML = 'YOU WIN!';
    let imgSuccess = document.createElement("img");
    imgSuccess.classList.add('result-img');
    imgSuccess.src = './img/icons/success.jpg';
    resultWrapper.appendChild(imgSuccess);
  } else {
    let failureAudio = new Audio();
    failureAudio.src = './audio/failure.mp3';
    failureAudio.play();
    resultWrapper.innerHTML = 'KEEP TRYING! NEXT TIME YOU WILL WIN!';
    resultWrapper.innerHTML = 'WRONG ANSWERS: ' + wrongAnswers.length;
    let imgFailure = document.createElement("img");
    imgFailure.classList.add('result-img');
    imgFailure.src = './img/icons/failure.jpg';
    resultWrapper.appendChild(imgFailure);
  }
  setTimeout(mainPage, 4000);
  currentIndex = 0;
  wrongAnswers = [];
  check();
}

function mainPage() {
  wrapper.innerHTML = '';
  loadCards(cards[0]);
}

logo.addEventListener('click', mainPage);