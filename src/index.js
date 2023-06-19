import cards from "./js/cards.js";
import GridView from "./js/class/GridView.js";
import { WordCards } from "./js/class/WordCards.js";
import { CategoryCards } from "./js/class/CategoryCards.js";
let statistic = {};

window.onload = function () {
  checkStatistic();
  createStatistic();  
  //написать функцию проверки режима тренивка\игра
  //сделать отдельным модулем игру
  document.querySelectorAll(".link").forEach((link) => {
    link.addEventListener("click", changePage);
    link.addEventListener("click", closeNav);
  });

  document.querySelector(".logo").addEventListener("click", changePage);
  document.querySelector(".burger").addEventListener("click", openNav);

  document.addEventListener("click", (e) => {
    if (e.target === document.querySelector(".sidenav-background")) {
      closeNav();
    }
  });

  loadCards();
};

function loadCards() {
  const cardWrapper = getCardsWrapper();
  let data = getArray();
  generateCards(data).forEach(card => {
    cardWrapper.append(card.makeCard());
  });
  addWordCardsClickHandlers();
  addCategoryCardsClickHandler();
}

function getCardsWrapper() {
  const wrapper = document.querySelector(".card-wrapper");
  wrapper.innerHTML = "";
  return wrapper;
}

function generateCards(data) {
  let newWordCards = [];
  let coumter = 0;
  let img, alt;
  if (data[0] === cards[0][0]) {
    data.forEach((card) => {
      img = cards[coumter + 1][6].image;
      alt = cards[coumter + 1][6].word;
      newWordCards.push(new CategoryCards(coumter, card, img, alt));
      coumter += 1;
    });
  } else {
    data.forEach((card) => {
      newWordCards.push(new WordCards(coumter, card));
      coumter += 1;
    });
  }
  return newWordCards;
}
  
function addWordCardsClickHandlers() {
  document.querySelectorAll('.play-card').forEach(card => {
    card.addEventListener('click', playAudio);
    card.addEventListener('mouseleave', removeRotation);
  });
  document.querySelectorAll('.rotate').forEach(card => {
    card.addEventListener('click', rotation);
  });
  document.querySelectorAll(".play-image").forEach((img) => {
    img.addEventListener("click", handleCardClick);
  });
}

function addCategoryCardsClickHandler() {
  document.querySelectorAll('.main').forEach(card => {
    card.addEventListener("click", changePage);
  });
}
/*
function addClickHandler(element, action) {
  element.addEventListener('click', action);
}
*/
// Get data to load word cards
function getArray() {
  let id = activeNavigationLink();
  let array = cards[id];
  return array;
}

function activeNavigationLink() {
  let linksArray = document.querySelectorAll("a");
  let id;
  linksArray.forEach((link) => {
    if (link.classList.contains("active")) {
      id = link.id;
    }
  });
  return id;
}

function changePage() {
  let array = document.querySelectorAll("a");
  array.forEach(link => {
    link.classList.remove("active");
    if (link.dataset.about == this.dataset.about) {
      link.classList.add("active");
      document.querySelector(".category-title").innerText = link.dataset.about;
    }
  });
  loadCards();
}

// Rotate the clicked card
function rotation() {
  let id = this.id[this.id.length - 1];
  let card = document.getElementById("card" + id);
  card.classList.add("card-rotited");
  let word = document.getElementById("title" + id);
  word.innerText = word.dataset.translation.toUpperCase();
  let btn = document.getElementById("rotate" + id);
  btn.style.opacity = "0";
}

function removeRotation() {
  if (this.classList.contains("card-rotited")) {
    this.classList.remove("card-rotited");
    let id = this.id[this.id.length - 1];
    let cardImg = document.getElementById("img" + id);
    let word = document.getElementById("title" + id);
    word.innerText = cardImg.alt.toUpperCase();
    let btn = document.getElementById("rotate" + id);
    btn.style.opacity = "1";
  }
}

function playAudio() {
  if (!this.classList.contains("card-rotited")) {
    let id = this.id[this.id.length - 1];
    let audioSrc = document.getElementById("audio" + id);
    let audio = new Audio();
    audio.src = audioSrc.src;
    audio.play();
    checkStatistic();
    statistic[audioSrc.dataset.word].trained += 1;
    saveStatisticToLS();
  }
}

// Open the side navigation by clicking on the hamburger icon
function openNav() {
  const burger = document.querySelector(".burger");
  if (burger.classList.contains("burger_active")) {
    closeNav();
  } else {
    burger.classList.add("burger_active");
    document.getElementById("mySidenav").style.width = "300px";
    document.body.style.overflow = "hidden";
    document.querySelector(".sidenav-background").classList.add("active");
  }
}

// Close the side navigation
function closeNav() {
  const burger = document.querySelector(".burger");
  burger.classList.remove("burger_active");
  document.getElementById("mySidenav").style.width = "0";
  document.body.style.overflow = "";
  document.querySelector(".sidenav-background").classList.remove("active");
}

/*
Toggle
*/
const toggle = document.querySelector(".switch");
const toggleType = document.querySelector(".toggle");
const train = document.querySelector(".train");
const play = document.querySelector(".play");
const footer = document.querySelector("footer");
const startButton = document.querySelector(".start");
let arrayOfIndex = [];

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
      img.style.width = "280px";
      img.style.height = "172px";
    });
    document.querySelectorAll(".play-card").forEach((card) => {
      card.style.height = "247px";
      card.addEventListener("click", playAudio);
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
      img.style.width = "280px";
      img.style.height = "192px";
    });
    document.querySelectorAll(".play-card").forEach((card) => {
      card.style.height = "192px";
      card.removeEventListener("click", playAudio);
    });
    arrayOfIndex = shuffle(document.querySelectorAll(".play-card").length);
  }
}

toggle.addEventListener("click", check);
startButton.addEventListener("click", StartGame);
/*
Start the game
*/
function shuffle(length) {
  let array = [];
  for (let i = 0; i < length; i++) {
    array.push(i);
  }
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const startIcon = document.querySelector(".start-icon");
let currentIndex = 0;
let audioElement = null;
let wrongAnswers = [];

function StartGame() {
  if (footer.style.height === "60px") {
    startIcon.style.backgroundImage =
      "url('../src/assets/img/icons/repeat.svg')";
    startIcon.setAttribute("alt", "repeat");
    let array = [];
    document.querySelectorAll("audio").forEach((audio) => {
      array.push({
        audio: audio.src,
        word: audio.dataset.word.toLocaleLowerCase(),
      });
    });
    console.log(array);

    if (audioElement === null) {
      audioElement = new Audio();
    }
    audioElement.src = array[arrayOfIndex[currentIndex]].audio;
    audioElement.play();
  }
}

function handleCardClick(event) {
  if (
    footer.style.height === "60px" &&
    startIcon.getAttribute("alt") === "repeat"
  ) {
    let array = [];
    document.querySelectorAll("audio").forEach((audio) => {
      array.push({
        audio: audio.src,
        word: audio.dataset.word.toLocaleLowerCase(),
      });
    });
    console.log(array);
    const clickedImg = event.target;
    const clickedWord = event.target.getAttribute("alt");
    let starsLength = document.querySelectorAll(".star");
    if (starsLength.length > 9) {
      const firstStar = document.querySelector(".star");
      const parent = firstStar.parentNode;
      parent.removeChild(firstStar);
    }
    if (clickedWord === array[arrayOfIndex[currentIndex]].word) {
      statistic[array[arrayOfIndex[currentIndex]].word].correct += 1;
      clickedImg.style.opacity = "0.5";
      clickedImg.removeEventListener("click", handleCardClick);
      let starWin = document.createElement("img");
      starWin.classList.add("star");
      starWin.src = "../src/assets/img/icons/star-win.svg";
      starWin.alt = "star";
      document.querySelector(".stars-wrapper").appendChild(starWin);
      let correctAudio = new Audio();
      correctAudio.src = "../src/assets/audio/correct.mp3";
      correctAudio.play();
      currentIndex++;

      if (currentIndex < array.length) {
        setTimeout(StartGame, 2000);
      } else {
        audioElement = null;
        setTimeout(EndTheGame, 2000);
      }
    } else {
      statistic[array[currentIndex].word].incorrect += 1;
      wrongAnswers.push(array[arrayOfIndex[currentIndex]].word);
      console.log(wrongAnswers);
      let star = document.createElement("img");
      star.classList.add("star");
      star.src = "../src/assets/img/icons/star.svg";
      star.alt = "star";
      document.querySelector(".stars-wrapper").appendChild(star);
      let errorAudio = new Audio();
      errorAudio.src = "../src/assets/audio/error.mp3";
      errorAudio.play();
    }
    saveStatisticToLS();
    checkStatistic();
  }
}
const cardElements = document.querySelectorAll(".play-image");

cardElements.forEach(function (cardElement) {
  cardElement.addEventListener("click", handleCardClick);
});

function EndTheGame() {
  document.querySelector(".stars-wrapper").innerHTML = "";
  let wrapper = getCardsWrapper();
  categoryTitle.innerHTML = "";
  startIcon.style.backgroundImage = "url('../src/assets/img/icons/play.svg')";
  startIcon.setAttribute("alt", "start");
  const resultWrapper = document.createElement("div");
  resultWrapper.classList.add("result-wrapper");
  wrapper.appendChild(resultWrapper);
  if (wrongAnswers.length === 0) {
    let successAudio = new Audio();
    successAudio.src = "../src/assets/audio/success.mp3";
    successAudio.play();
    resultWrapper.innerHTML = "YOU WIN!";
    let imgSuccess = document.createElement("img");
    imgSuccess.classList.add("result-img");
    imgSuccess.src = "../src/assets/img/icons/success.jpg";
    resultWrapper.appendChild(imgSuccess);
  } else {
    let failureAudio = new Audio();
    failureAudio.src = "../src/assets/audio/failure.mp3";
    failureAudio.play();
    resultWrapper.innerHTML = "KEEP TRYING! NEXT TIME YOU WILL WIN!";
    resultWrapper.innerHTML = "WRONG ANSWERS: " + wrongAnswers.length;
    let imgFailure = document.createElement("img");
    imgFailure.classList.add("result-img");
    imgFailure.src = "../src/assets/img/icons/failure.jpg";
    resultWrapper.appendChild(imgFailure);
  }
  setTimeout(mainPage, 4000);
  currentIndex = 0;
  wrongAnswers = [];
  check();
  for (let key in statistic) {
    if (statistic[key].incorrect != 0) {
      let res = statistic[key].incorrect / statistic[key].correct;
      let percent = Math.round(res * 100);
      if (percent > 100) {
        statistic[key].percent = 100;
      } else {
        statistic[key].percent = percent;
      }
    }
  }
  saveStatisticToLS();
}

/*
Statistic
*/
function repeatDifficultWords() {
  document.querySelector(".stars-wrapper").innerHTML = "";
  wrapper.innerHTML = "";
  categoryTitle.innerHTML = "Difficult words";
  checkStatistic();
  console.log(statistic);
  let newStat = [];
  for (let key in statistic) {
    if (statistic[key].incorrect != 0) {
      newStat.push({
        word: key,
        translation: statistic[key].translation,
        image: statistic[key].img,
        incorrect: statistic[key].incorrect,
        audioSrc: statistic[key].audioSrc,
      });
    }
  }
  newStat.sort((a, b) => (a.incorrect < b.incorrect ? 1 : -1));
  if (newStat.length !== 0) {
    loadCards(newStat.slice(0, 8), "Difficult words");
  }
}

function showStatistic() {
  saveStatisticToLS();
  checkStatistic();
  console.log(statistic);
  wrapper.innerHTML = "";
  document.querySelector(".stars-wrapper").innerHTML = "";
  categoryTitle.innerHTML = "Statistic";
  let difficultWords = document.createElement("button");
  difficultWords.innerHTML = "Repeat difficult words";
  difficultWords.classList.add("statistic-btn");
  difficultWords.classList.add("repeat-words");
  document.querySelector(".stars-wrapper").appendChild(difficultWords);
  difficultWords.addEventListener("click", repeatDifficultWords);
  let reset = document.createElement("button");
  reset.innerHTML = "Reset";
  reset.classList.add("statistic-btn");
  reset.classList.add("reset");
  document.querySelector(".stars-wrapper").appendChild(reset);
  reset.addEventListener("click", function () {
    for (let key in statistic) {
      statistic[key].trained = 0;
      statistic[key].correct = 0;
      statistic[key].incorrect = 0;
      statistic[key].percent = 0;
    }
    saveStatisticToLS();
    showStatistic();
  });

  const attribute = [
    "№",
    "Words",
    "Translation",
    "Categories",
    "Trained",
    "Correct",
    "Wrong",
    "%",
  ];
  let gridView = new GridView(".card-wrapper", attribute, statistic, cards);
  gridView.render();
  document.querySelectorAll("a").forEach((link) => {
    link.classList.remove("active");
  });
  document.querySelectorAll("th").forEach((header) => {
    header.addEventListener("click", function () {
      sortTable(this.id);
    });
  });
}

document.querySelector(".statistic").addEventListener("click", showStatistic);

function sortTable(n) {
  let table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.querySelector("#table");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.classList.contains("number")) {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        } else if (x.classList.contains("string")) {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      } else if (dir == "desc") {
        if (x.classList.contains("number")) {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        } else if (x.classList.contains("string")) {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
// Check statistic in the localStorage
function checkStatistic() {
  if (localStorage.getItem("statistic") !== null) {
    statistic = JSON.parse(localStorage.getItem("statistic"));
  }
}

// Save statistic to localStorage
function saveStatisticToLS() {
  localStorage.setItem("statistic", JSON.stringify(statistic));
}

function createStatistic() {
  for (let i = 1; i < cards.length; i++) {
    for (let j = 0; j < cards[i].length; j++) {
      if (statistic[cards[i][j].word] == undefined) {
        statistic[cards[i][j].word] = {
          translation: cards[i][j].translation,
          trained: 0,
          correct: 0,
          incorrect: 0,
          percent: 0,
          img: cards[i][j].image,
          audioSrc: cards[i][j].audioSrc,
        };
      }
    }
    saveStatisticToLS();
  }
}
