import cards from "./js/cards.js";

import { GridView } from "./js/class/GridView.js";
import { WordCards } from "./js/class/WordCards.js";
import { CategoryCards } from "./js/class/CategoryCards.js";

import { check } from "./js/toggle.js";

import { StartGame } from "./js/game.js";

export let statistic = {};

window.onload = function () {
  checkStatistic();
  createStatistic();
  //написать функцию проверки режима тренировка\игра
  document.querySelectorAll(".link").forEach((link) => {
    link.addEventListener("click", changePage);
    link.addEventListener("click", closeNav);
  });

  document.querySelector(".logo").addEventListener("click", changePage);
  document.querySelector(".main-icon").addEventListener("click", changePage);
  document.querySelector(".burger").addEventListener("click", openNav);

  document.addEventListener("click", (e) => {
    if (e.target === document.querySelector(".sidenav-background")) {
      closeNav();
    }
  });
  document.querySelector(".statistic").addEventListener("click", showStatistic);
  document.querySelector(".switch").addEventListener("click", check);
  document.querySelector(".start").addEventListener("click", StartGame);

  loadCards();
};

export function loadCards() {
  const cardWrapper = getCardsWrapper();
  let data = getArray();
  generateCards(data).forEach((card) => {
    cardWrapper.append(card.makeCard());
  });
  addWordCardsClickHandlers();
  addCategoryCardsClickHandler();
}

export function getCardsWrapper() {
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
  document.querySelectorAll(".play-card").forEach((card) => {
    card.addEventListener("click", playAudio);
    card.addEventListener("mouseleave", removeRotation);
  });
  document.querySelectorAll(".rotate").forEach((card) => {
    card.addEventListener("click", rotation);
  });
}

function addCategoryCardsClickHandler() {
  document.querySelectorAll(".main").forEach((card) => {
    card.addEventListener("click", changePage);
  });
}

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
  array.forEach((link) => {
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

export function playAudio() {
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
Statistic
*/
function repeatDifficultWords() {
  ClearWrappers();
  document.querySelector(".category-title").innerHTML = "Difficult words";
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
  ClearWrappers();
  document.querySelector(".category-title").innerHTML = "Statistic";
  showStatisticButtons();

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

// Show buttons
function showStatisticButtons() {
  let difficultWords = createDomNode(
    "button",
    "Repeat difficult words",
    ".stars-wrapper",
    "statistic-btn",
    "repeat-words"
  );
  difficultWords.addEventListener("click", repeatDifficultWords);
  let reset = createDomNode(
    "button",
    "Reset",
    ".stars-wrapper",
    "statistic-btn",
    "reset"
  );
  reset.addEventListener("click", ClearStatisticsTable);
}

function createDomNode(element, text = "", wrapper, ...classes) {
  let node = document.createElement(element);
  node.innerHTML = text;
  node.classList.add(...classes);
  document.querySelector(wrapper).appendChild(node);
  return node;
}

// Clear all wrappers
function ClearWrappers() {
  let wrapper = getCardsWrapper();
  document.querySelector(".stars-wrapper").innerHTML = "";
}
// Clear statistics table
function ClearStatisticsTable() {
  for (let key in statistic) {
    statistic[key].trained = 0;
    statistic[key].correct = 0;
    statistic[key].incorrect = 0;
    statistic[key].percent = 0;
  }
  saveStatisticToLS();
  showStatistic();
}

// Check statistic in the localStorage
export function checkStatistic() {
  if (localStorage.getItem("statistic") !== null) {
    statistic = JSON.parse(localStorage.getItem("statistic"));
  }
}

// Save statistic to localStorage
export function saveStatisticToLS() {
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
