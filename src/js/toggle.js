import { playAudio } from '../index.js';
import { handleCardClick, shuffle } from './game.js';

export let arrayOfIndex = [];

export function check() {
  if (document.querySelector('.toggle').checked) {
    changeGameMode(false, '#ADACAC', '#87C159');
  } else {
    changeGameMode(true, '#F3C301', '#ADACAC');
  }
}

function changeGameMode(boolean, playColor, trainColor) {
  document.querySelector('.toggle').checked = boolean;
  document.querySelector('.play').style.color = playColor;
  document.querySelector('.train').style.color = trainColor;
}

function checkGameMode() {
  if (localStorage.getItem('theme') === 'game') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'game');
  }
  addGameMode();
}

document.querySelector('.toggle').addEventListener('click', checkGameMode);

export function addGameMode() {
  if (localStorage.getItem('theme') === 'game') {
    arrayOfIndex = shuffle(document.querySelectorAll('.play-card').length);
    if (
      document.querySelector('.main-link.active') ||
      document.querySelector('.statistic-table')
    ) {
      changeFooterStyle();
    } else {
      changeFooterStyle('60px', 'flex');
    }
    addGameModeStyles('none', '1px', 'block');
  } else {
    changeFooterStyle();
    addGameModeStyles('flex', '25px', 'none');
  }
}

function addGameModeStyles(displayPlayTitle, marginTop, displayPlayMode) {
  document.querySelectorAll('.play-title').forEach((element) => {
    element.style.display = displayPlayTitle;
  });
  if (displayPlayTitle === 'none') {
    document.querySelectorAll('.play-card').forEach((card) => {
      card.removeEventListener('click', playAudio);
    });
    document.querySelectorAll('.play-image').forEach((img) => {
      img.addEventListener('click', handleCardClick);
    });
  } else {
    document.querySelectorAll('.play-card').forEach((card) => {
      card.addEventListener('click', playAudio);
    });
    document.querySelectorAll('.play-image').forEach((img) => {
      img.removeEventListener('click', handleCardClick);
    });
  }
  document.querySelectorAll('.main-title').forEach((element) => {
    element.style.marginTop = marginTop;
  });
  document.querySelectorAll('.play-mode').forEach((element) => {
    element.style.display = displayPlayMode;
  });
}

export function changeFooterStyle(height = '0', display = 'none') {
  document.querySelector('footer').style.height = height;
  document.querySelector('.start').style.display = display;
}