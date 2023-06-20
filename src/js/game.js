import { arrayOfIndex } from "./toggle.js";
import { check } from "./toggle.js";

import { statistic } from "../index.js";
import { saveStatisticToLS } from "../index.js";
import { checkStatistic } from "../index.js";
import { getCardsWrapper } from "../index.js";
import { loadCards } from "../index.js";

export function shuffle(length) {
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

let currentIndex = 0;
let audioElement = null;
let wrongAnswers = [];

export function StartGame() {
  if (document.querySelector(".toggle").checked === true) {
    changeStarIcon(true);
    let array = gatData();

    if (audioElement === null) {
      audioElement = new Audio();
    }
    audioElement.src = array[arrayOfIndex[currentIndex]].audio;
    audioElement.play();
  }
}

export function handleCardClick(event) {
  if (
    document.querySelector(".toggle").checked === true &&
    document.querySelector(".start-icon").getAttribute("alt") === "repeat"
  ) {
    let array = gatData();

    const clickedImg = event.target;
    const clickedWord = event.target.getAttribute("alt");
    checkStarCount();
    if (clickedWord === array[arrayOfIndex[currentIndex]].word) {
      statistic[array[arrayOfIndex[currentIndex]].word].correct += 1;
      clickedImg.style.opacity = "0.5";
      clickedImg.removeEventListener("click", handleCardClick);
      showGameResult(
        "../src/assets/audio/correct.mp3",
        "../src/assets/img/icons/star-win.svg",
        "star",
        ".stars-wrapper"
      );
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
      showGameResult(
        "../src/assets/audio/error.mp3",
        "../src/assets/img/icons/star.svg",
        "star",
        ".stars-wrapper"
      );
    }
    saveStatisticToLS();
    checkStatistic();
  }
}

export function EndTheGame() {
  document.querySelector(".stars-wrapper").innerHTML = "";
  let wrapper = getCardsWrapper();
  document.querySelector(".category-title").innerText = "";
  changeStarIcon(false);

  const resultWrapper = document.createElement("div");
  resultWrapper.classList.add("result-wrapper");
  wrapper.appendChild(resultWrapper);
  if (wrongAnswers.length === 0) {
    showGameResult(
      "../src/assets/audio/success.mp3",
      "../src/assets/img/icons/success.jpg",
      "result-img",
      ".result-wrapper",
      "YOU WIN!"
    );
  } else {
    showGameResult(
      "../src/assets/audio/failure.mp3",
      "../src/assets/img/icons/failure.jpg",
      "result-img",
      ".result-wrapper",
      "KEEP TRYING! NEXT TIME YOU WILL WIN!\nWRONG ANSWERS: " +
        wrongAnswers.length
    );
  }

  setTimeout(loadCards, 4000);
  currentIndex = 0;
  wrongAnswers = [];
  check();
  countPercent();
  saveStatisticToLS();
}

function changeStarIcon(status) {
  let icon = document.querySelector(".start-icon");
  if (status) {
    icon.style.backgroundImage = "url('../src/assets/img/icons/repeat.svg')";
    icon.setAttribute("alt", "repeat");
  } else {
    icon.style.backgroundImage = "url('../src/assets/img/icons/play.svg')";
    icon.setAttribute("alt", "start");
  }
}

function gatData() {
  let array = [];
  document.querySelectorAll("audio").forEach((audio) => {
    array.push({
      audio: audio.src,
      word: audio.dataset.word.toLocaleLowerCase(),
    });
  });
  console.log(array);
  return array;
}

function checkStarCount() {
  let starsLength = document.querySelectorAll(".star");
  if (starsLength.length > 9) {
    const firstStar = document.querySelector(".star");
    const parent = firstStar.parentNode;
    parent.removeChild(firstStar);
  }
}

function showGameResult(audioSrc, imgSrc, imgClass, wrapper, text = "") {
  let audio = new Audio();
  audio.src = audioSrc;
  audio.play();
  if (text) {
    document.querySelector(wrapper).innerHTML = text;
  }
  let img = document.createElement("img");
  img.classList.add(imgClass);
  img.src = imgSrc;
  img.alt = imgClass;
  document.querySelector(wrapper).append(img);
}

function countPercent() {
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
}