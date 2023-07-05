import cards from '../js/cards.js';
import { arrayOfIndex, check, changeFooterStyle } from './toggle.js';
import { statistic, saveStatisticToLS, checkStatistic, getCardsWrapper, loadCards } from '../index.js';

export function shuffle(length) {
  const array = Array.from({ length }, (_, index) => index);
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
  if (document.querySelector('.toggle').checked === true) {
    changeStartIcon(true);
    const array = getData();

    if (audioElement === null) {
      audioElement = new Audio();
    }
    audioElement.src = array[arrayOfIndex[currentIndex]].audio;
    audioElement.play();
  }
}

export function handleCardClick(event) {
  if (
    document.querySelector('.toggle').checked === true &&
    document.querySelector('.start-icon').getAttribute('alt') === 'repeat'
  ) {
    const array = getData();

    const clickedImg = event.target;
    const clickedWord = event.target.getAttribute('alt');
    checkStarCount();
    if (clickedWord === array[arrayOfIndex[currentIndex]].word) {
      statistic[array[arrayOfIndex[currentIndex]].word].correct += 1;
      clickedImg.style.opacity = '0.5';
      clickedImg.removeEventListener('click', handleCardClick);
      showGameResult(
        './assets/audio/correct.mp3',
        './assets/img/icons/star-win.svg',
        'star',
        '.stars-wrapper'
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
      showGameResult(
        './assets/audio/error.mp3',
        './assets/img/icons/star.svg',
        'star',
        '.stars-wrapper'
      );
    }
    saveStatisticToLS();
    checkStatistic();
  }
}

export function EndTheGame() {
  document.querySelector('.stars-wrapper').innerHTML = '';
  const wrapper = getCardsWrapper();
  document.querySelector('.category-title').innerText = '';
  changeStartIcon(false);
  changeFooterStyle();
  localStorage.removeItem('theme');
  check();
  const resultWrapper = document.createElement('div');
  resultWrapper.classList.add('result-wrapper');
  wrapper.appendChild(resultWrapper);
  if (wrongAnswers.length === 0) {
    showGameResult(
      './assets/audio/success.mp3',
      './assets/img/icons/success.jpg',
      'result-img',
      '.result-wrapper',
      'YOU WIN!'
    );
  } else {
    showGameResult(
      './assets/audio/failure.mp3',
      './assets/img/icons/failure.jpg',
      'result-img',
      '.result-wrapper',
      'KEEP TRYING! NEXT TIME YOU WILL WIN!\nWRONG ANSWERS: ' +
        wrongAnswers.length
    );
  }
  setTimeout(toMainPage, 4000);
  currentIndex = 0;
  wrongAnswers = [];
  countPercent();
  saveStatisticToLS();
}

function changeStartIcon(status) {
  const icon = document.querySelector('.start-icon');
  if (status) {
    icon.src = './assets/img/icons/repeat.svg';
    icon.setAttribute('alt', 'repeat');
  } else {
    icon.src = './assets/img/icons/play.svg';
    icon.setAttribute('alt', 'start');
  }
}

function getData() {
  const array = [];
  document.querySelectorAll('audio').forEach((audio) => {
    array.push({
      audio: audio.src,
      word: audio.dataset.word.toLocaleLowerCase(),
    });
  });
  return array;
}

function checkStarCount() {
  const starsLength = document.querySelectorAll('.star');
  if (starsLength.length > 9) {
    const firstStar = document.querySelector('.star');
    const parent = firstStar.parentNode;
    parent.removeChild(firstStar);
  }
}

function showGameResult(audioSrc, imgSrc, imgClass, wrapper, text = '') {
  const audio = new Audio();
  audio.src = audioSrc;
  audio.play();
  if (text) {
    document.querySelector(wrapper).innerHTML = text;
  }
  const img = document.createElement('img');
  img.classList.add(imgClass);
  img.src = imgSrc;
  img.alt = imgClass;
  document.querySelector(wrapper).append(img);
}

function toMainPage() {
  const array = document.querySelectorAll('a');
  array.forEach((link) => {
    link.classList.remove('active');
  });
  document.querySelector('.main-link').classList.add('active');
  document.querySelector('.category-title').innerText = 'Main';
  loadCards();
}

function countPercent() {
  for (let key in statistic) {
    if (statistic[key].incorrect != 0) {
      const res = statistic[key].incorrect / statistic[key].correct;
      const percent = Math.round(res * 100);
      if (percent > 100) {
        statistic[key].percent = 100;
      } else {
        statistic[key].percent = percent;
      }
    }
  }
}