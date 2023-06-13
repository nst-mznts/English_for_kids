/*
switch pages
*/
import cards from "./cards.js";
import GridView from "./class/GridView.js";
import WordCards from "./class/WordCards.js";
import CategoryCards from "./class/CategoryCards.js";

const body = document.body;
let statistic = {};
checkStatistic();
createStatistic();
const wrapper = document.querySelector(".card-wrapper");
let menuLinks = document.querySelectorAll(".cards-menu");
const logo = document.querySelector(".logo");
const starsWrapper = document.querySelector(".stars-wrapper");
const categoryTitle = document.querySelector(".category-title");
mainPage();

function loadCards(data, dataset = "Main") {
  checkStatistic();
  starsWrapper.innerHTML = "";
  categoryTitle.innerHTML = dataset;
  for (let i = 0; i < data.length; i++) {
    if (dataset == "Main") {
      let categoryCard = new CategoryCards(
        cards[i + 1][6].image,
        cards[i + 1][6].word,
        i,
        data[i].toUpperCase()
      ).render();
      categoryCard.classList.add("main");
      categoryCard.setAttribute("data-about", data[i]);
      categoryCard.addEventListener("click", changePage);
    } else {
      let card = new WordCards(
        data[i].image,
        data[i].word,
        i,
        data[i].word.toUpperCase(),
        dataset,
        data[i].audioSrc,
        data[i].translation
      ).render();
      card.classList.add("play-card");
      card.setAttribute("data-about", dataset);
      if (toggleType.checked) {
        document.querySelectorAll(".play-title").forEach((element) => {
          element.style.display = "none";
        });
        document.querySelectorAll(".play-image").forEach((img) => {
          img.style.width = "343px";
          img.style.height = "235px";
        });
        document.querySelectorAll(".play-card").forEach((card) => {
          card.style.height = "235px";
          card.removeEventListener("click", playAudio);
        });
        arrayOfIndex = shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
      } else {
        card.addEventListener("mouseleave", removeRotation);
        card.addEventListener("click", playAudio);
      }
      //statistic[data[i].word][categories] = card.dataset.about;
      saveStatisticToLS();
      document.querySelectorAll(".card-image").forEach((img) => {
        img.classList.add("play-image");
        img.addEventListener("click", handleCardClick);
      });
      document.querySelectorAll(".rotate-icon").forEach((icon) => {
        icon.addEventListener("click", rotation);
      });
    }
  }
}

function getArray(dataset) {
  let array = [];
  for (let i = 0; i < cards[0].length; i++) {
    if (dataset == cards[0][i]) {
      array = cards[i + 1];
    } else if (dataset == "Main") {
      array = cards[0];
    }
  }
  return array;
}

function changePage() {
  let arr = document.querySelectorAll("a");
  for (let i = 0; i < arr.length; i++) {
    arr[i].classList.remove("active");
    if (arr[i].dataset.about == this.dataset.about) {
      arr[i].classList.add("active");
    }
  }
  wrapper.innerHTML = "";
  loadCards(getArray(this.dataset.about), this.dataset.about);
}

menuLinks.forEach((link) => {
  link.addEventListener("click", changePage);
});

function mainPage() {
  wrapper.innerHTML = "";
  loadCards(cards[0]);
}

logo.addEventListener("click", mainPage);
logo.addEventListener("click", changePage);
/*
Rotation cards
*/
function rotation() {
  let id = this.id;
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
/*
Audio
*/
function playAudio() {
  if (!this.classList.contains("card-rotited")) {
    let id = this.id[this.id.length - 1];
    let audioSrc = document.getElementById("audio" + id);
    let cardImg = document.getElementById("img" + id);
    let audio = new Audio();
    audio.src = audioSrc.src;
    audio.play();
    checkStatistic();
    statistic[cardImg.alt].trained += 1;
    saveStatisticToLS();
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
  if (burger.classList.contains("burger_active")) {
    closeNav();
  } else {
    burger.classList.add("burger_active");
    navigation.style.width = "300px";
    body.style.overflow = "hidden";
    background.classList.add("active");
  }
}

function closeNav() {
  burger.classList.remove("burger_active");
  navigation.style.width = "0";
  body.style.overflow = "";
  background.classList.remove("active");
}

burger.addEventListener("click", openNav);

document.addEventListener("click", (e) => {
  if (e.target === background) {
    closeNav();
  }
});

link.forEach((element) => {
  element.addEventListener("click", closeNav);
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
      img.style.width = "323px";
      img.style.height = "215px";
    });
    document.querySelectorAll(".play-card").forEach((card) => {
      card.style.height = "290px";
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
      img.style.width = "343px";
      img.style.height = "235px";
    });
    document.querySelectorAll(".play-card").forEach((card) => {
      card.style.height = "235px";
      card.removeEventListener("click", playAudio);
    });
    arrayOfIndex = shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
  }
}

toggle.addEventListener("click", check);
startButton.addEventListener("click", StartGame);
/*
Start the game
*/
function shuffle(array) {
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
    startIcon.style.backgroundImage = "url('../../img/icons/repeat.svg')";
    startIcon.setAttribute("alt", "repeat");
    //let dataAttribute = document.querySelector("a.active").dataset.about;
    //let array = getArray(dataAttribute);
    let array = [];
    document.querySelectorAll("audio").forEach((audio) => {
      //let src = audio.src;
      //let result = src.replace("http://127.0.0.1:5500", ".");
      //array.push(result);
      array.push(audio.src);
    });
    console.log(array);

    if (audioElement === null) {
      audioElement = new Audio();
    }
    //audioElement.src = array[arrayOfIndex[currentIndex]].audioSrc;
    audioElement.src = array[arrayOfIndex[currentIndex]];
    audioElement.play();
  }
}

function handleCardClick(event) {
  if (
    footer.style.height === "60px" &&
    startIcon.getAttribute("alt") === "repeat"
  ) {
    //let dataAttribute = document.querySelector("a.active").dataset.about;
    //let array = getArray(dataAttribute);
    let array = [];
    document.querySelectorAll("audio").forEach((audio) => {
      //let src = audio.src;
      //let result = src.replace("http://127.0.0.1:5500", ".");
      //array.push(result);
      array.push(audio.src);
    });
    console.log(array);
    const clickedImg = event.target;
    const clickedWord = event.target.getAttribute("alt");
    let starsLength = document.querySelectorAll(".star");
    if (starsLength.length > 22) {
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
      starWin.src = "./img/icons/star-win.svg";
      starWin.alt = "star";
      starsWrapper.appendChild(starWin);
      let correctAudio = new Audio();
      correctAudio.src = "./audio/correct.mp3";
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
      star.src = "./img/icons/star.svg";
      star.alt = "star";
      starsWrapper.appendChild(star);
      let errorAudio = new Audio();
      errorAudio.src = "./audio/error.mp3";
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
  starsWrapper.innerHTML = "";
  wrapper.innerHTML = "";
  categoryTitle.innerHTML = "";
  startIcon.style.backgroundImage = "url('../../img/icons/play.svg')";
  startIcon.setAttribute("alt", "start");
  const resultWrapper = document.createElement("div");
  resultWrapper.classList.add("result-wrapper");
  wrapper.appendChild(resultWrapper);
  if (wrongAnswers.length === 0) {
    let successAudio = new Audio();
    successAudio.src = "./audio/success.mp3";
    successAudio.play();
    resultWrapper.innerHTML = "YOU WIN!";
    let imgSuccess = document.createElement("img");
    imgSuccess.classList.add("result-img");
    imgSuccess.src = "./img/icons/success.jpg";
    resultWrapper.appendChild(imgSuccess);
  } else {
    let failureAudio = new Audio();
    failureAudio.src = "./audio/failure.mp3";
    failureAudio.play();
    resultWrapper.innerHTML = "KEEP TRYING! NEXT TIME YOU WILL WIN!";
    resultWrapper.innerHTML = "WRONG ANSWERS: " + wrongAnswers.length;
    let imgFailure = document.createElement("img");
    imgFailure.classList.add("result-img");
    imgFailure.src = "./img/icons/failure.jpg";
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
  starsWrapper.innerHTML = "";
  wrapper.innerHTML = "";
  categoryTitle.innerHTML = "Difficult words";
  checkStatistic();
  //console.log(statistic);
  let newStat = [];
  for (let key in statistic) {
    if (statistic[key].incorrect != 0) {
      newStat.push({
        word: key,
        translation: statistic[key].translation,
        image: statistic[key].img,
        incorrect: statistic[key].incorrect,
        audioSrc: statistic[key].audioSrc
      });
    }
  }
  newStat.sort((a, b) => a.incorrect < b.incorrect ? 1 : -1);
  //console.log(newStat);
  if (newStat.length !== 0) {
    loadCards(newStat, 'Difficult words');
  }
}

function showStatistic() {
  saveStatisticToLS();
  checkStatistic();
  console.log(statistic);
  wrapper.innerHTML = "";
  starsWrapper.innerHTML = "";
  categoryTitle.innerHTML = 'Statistic';
  let difficultWords = document.createElement("button");
  difficultWords.innerHTML = "Repeat difficult words";
  difficultWords.classList.add("statistic-btn");
  difficultWords.classList.add("repeat-words");
  starsWrapper.appendChild(difficultWords);
  difficultWords.addEventListener("click", repeatDifficultWords);
  let reset = document.createElement("button");
  reset.innerHTML = "Reset";
  reset.classList.add("statistic-btn");
  reset.classList.add("reset");
  starsWrapper.appendChild(reset);
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
    "Incorrect",
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
  for (let i=1; i < cards.length; i++) {
    for (let j=0; j < cards[i].length; j++) {
      if (statistic[cards[i][j].word] == undefined) {
        statistic[cards[i][j].word] = {
        translation: cards[i][j].translation,
        trained: 0,
        correct: 0,
        incorrect: 0,
        percent: 0,
        img: cards[i][j].image,
        audioSrc: cards[i][j].audioSrc
        };
      }
    }
    saveStatisticToLS();
  }
}