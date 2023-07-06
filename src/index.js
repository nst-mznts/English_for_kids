import cards from './js/cards.js';
import GridView from './js/class/GridView.js';
import WordCards from './js/class/WordCards.js';
import CategoryCards from './js/class/CategoryCards.js';
import { check, addGameMode } from './js/toggle.js';
import { StartGame } from './js/game.js';
import './sass/style.scss';
export let statistic = {};

window.onload = function () {
  checkStatistic();
  createStatistic();
  localStorage.removeItem('theme');
  document.querySelectorAll('.link').forEach((link) => {
    link.addEventListener('click', changePage);
    link.addEventListener('click', closeNav);
  });

  document.querySelector('.logo').addEventListener('click', changePage);
  document.querySelector('.main-icon').addEventListener('click', changePage);
  document.querySelector('.burger').addEventListener('click', openNav);

  document.addEventListener('click', (e) => {
    if (e.target === document.querySelector('.sidenav-background')) {
      closeNav();
    }
  });
  document.querySelector('.statistic').addEventListener('click', showStatistic);
  document.querySelector('.switch').addEventListener('click', check);
  document.querySelector('.start').addEventListener('click', StartGame);
  loadCards();
  addGameMode();
};
/*
 * Pages with word cards
 */
export function loadCards(data = []) {
  document.querySelector('.stars-wrapper').innerHTML = '';
  const cardWrapper = getCardsWrapper();
  if (data.length === 0) {
    data = getArray();
  }
  generateCards(data).forEach((card) => {
    cardWrapper.append(card.makeCard());
  });
  addWordCardsClickHandlers();
  addCategoryCardsClickHandler();
  addGameMode();
}

export function getCardsWrapper() {
  const wrapper = document.querySelector('.card-wrapper');
  wrapper.innerHTML = '';
  return wrapper;
}

function generateCards(data) {
  const newWordCards = [];
  let coumter = 0;
  let img;
  let alt;
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
  document.querySelectorAll('.play-card').forEach((card) => {
    card.addEventListener('click', playAudio);
    card.addEventListener('mouseleave', removeRotation);
  });
  document.querySelectorAll('.rotate').forEach((card) => {
    card.addEventListener('click', rotation);
  });
}

function addCategoryCardsClickHandler() {
  document.querySelectorAll('.main').forEach((card) => {
    card.addEventListener('click', changePage);
  });
}

// Get data to load word cards
function getArray() {
  const id = activeNavigationLink();
  const array = cards[id];
  return array;
}

function activeNavigationLink() {
  const linksArray = document.querySelectorAll('a');
  let id;
  linksArray.forEach((link) => {
    if (link.classList.contains('active')) {
      id = link.id;
    }
  });
  return id;
}

function changePage() {
  const array = document.querySelectorAll('a');
  array.forEach((link) => {
    link.classList.remove('active');
    if (link.dataset.about === this.dataset.about) {
      link.classList.add('active');
      document.querySelector('.category-title').innerText = link.dataset.about;
    }
  });
  loadCards();
}

// Rotate the clicked card
function rotation() {
  const id = this.id[this.id.length - 1];
  const card = document.getElementById('card' + id);
  card.classList.add('card-rotited');
  const word = document.getElementById('title' + id);
  word.innerText = word.dataset.translation.toUpperCase();
  const btn = document.getElementById('rotate' + id);
  btn.style.opacity = '0';
}

function removeRotation() {
  if (this.classList.contains('card-rotited')) {
    this.classList.remove('card-rotited');
    const id = this.id[this.id.length - 1];
    const cardImg = document.getElementById('img' + id);
    const word = document.getElementById('title' + id);
    word.innerText = cardImg.alt.toUpperCase();
    const btn = document.getElementById('rotate' + id);
    btn.style.opacity = '1';
  }
}

export function playAudio() {
  if (!this.classList.contains('card-rotited')) {
    const id = this.id[this.id.length - 1];
    const audioSrc = document.getElementById('audio' + id);
    const audio = new Audio();
    audio.src = audioSrc.src;
    audio.play();
    checkStatistic();
    statistic[audioSrc.dataset.word].trained += 1;
    saveStatisticToLS();
  }
}
/*
 * Side navigation
 */
// Open the side navigation by clicking on the hamburger icon
function openNav() {
  const burger = document.querySelector('.burger');
  if (burger.classList.contains('burger_active')) {
    closeNav();
  } else {
    burger.classList.add('burger_active');
    document.getElementById('mySidenav').style.width = '300px';
    document.body.style.overflow = 'hidden';
    document.querySelector('.sidenav-background').classList.add('active');
  }
}

// Close the side navigation
function closeNav() {
  const burger = document.querySelector('.burger');
  burger.classList.remove('burger_active');
  document.getElementById('mySidenav').style.width = '0';
  document.body.style.overflow = '';
  document.querySelector('.sidenav-background').classList.remove('active');
}
/*
 * Statistic page
 */
function showStatistic() {
  saveStatisticToLS();
  checkStatistic();
  ClearWrappers();
  document.querySelector('.category-title').innerHTML = 'Score';
  showStatisticButtons();

  const attribute = [
    '№',
    'Words',
    'Translation',
    'Categories',
    'Trained',
    'Correct',
    'Wrong',
    '%',
  ];
  const gridView = new GridView(attribute, statistic);
  gridView.render();
  document.querySelectorAll('a').forEach((link) => {
    link.classList.remove('active');
  });
  document.querySelectorAll('th').forEach((header) => {
    header.addEventListener('click', function () {
      GridView.sortTable(this.id);
    });
  });
  addGameMode();
}

// Show buttons
function showStatisticButtons() {
  const difficultWords = createDomNode(
    'button',
    'Repeat difficult words',
    '.stars-wrapper',
    'statistic-btn',
    'repeat-words'
  );
  difficultWords.addEventListener('click', repeatDifficultWords);
  const reset = createDomNode(
    'button',
    'Reset',
    '.stars-wrapper',
    'statistic-btn',
    'reset'
  );
  reset.addEventListener('click', ClearStatisticsTable);
}

// Show cards with difficult words
function repeatDifficultWords() {
  ClearWrappers();
  document.querySelector('.category-title').innerHTML = 'Difficult words';
  checkStatistic();
  const newStat = getDataWithDifficultWords();
  if (newStat.length !== 0) {
    loadCards(newStat.slice(0, 8), 'Difficult words');
  } else {
    const resultWrapper = createDomNode(
      'div',
      'There is no difficult words',
      '.card-wrapper',
      'result-wrapper'
    );
    const img = document.createElement('img');
    img.src = './assets/img/icons/emojis_smiling-face-with-sunglasses.svg';
    img.alt = 'emojis_smiling-face-with-sunglasses';
    resultWrapper.append(img);
  }
}

function getDataWithDifficultWords() {
  const newStat = [];
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
  return newStat;
}

function createDomNode(element, text = '', wrapper, ...classes) {
  const node = document.createElement(element);
  if (text) {
    node.innerHTML = text;
  }
  node.classList.add(...classes);
  document.querySelector(wrapper).append(node);
  return node;
}

// Clear all wrappers
function ClearWrappers() {
  document.querySelector('.stars-wrapper').innerHTML = '';
  document.querySelector('.card-wrapper').innerHTML = '';
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
/*
 * Save data to the localStorage
 */
// Check statistic in the localStorage
export function checkStatistic() {
  if (localStorage.getItem('statistic') !== null) {
    statistic = JSON.parse(localStorage.getItem('statistic'));
  }
}

// Save statistic to localStorage
export function saveStatisticToLS() {
  localStorage.setItem('statistic', JSON.stringify(statistic));
}

function createStatistic() {
  for (let i = 1; i < cards.length; i++) {
    const category = cards[0][i - 1];
    for (let j = 0; j < cards[i].length; j++) {
      if (statistic[cards[i][j].word] === undefined) {
        statistic[cards[i][j].word] = {
          translation: cards[i][j].translation,
          category: category,
          trained: 0,
          correct: 0,
          incorrect: 0,
          percent: 0,
          img: cards[i][j].image,
          audioSrc: cards[i][j].audioSrc,
        };
      } else {
        statistic[cards[i][j].word].img = cards[i][j].image;
        statistic[cards[i][j].word].audioSrc = cards[i][j].audioSrc;
      }
    }
    saveStatisticToLS();
  }
}