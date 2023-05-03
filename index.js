/*
switch pages
*/
const body = document.body;

document.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      route(e);
    }
    e.preventDefault();
});
  
  const route = (e) => {
    window.history.pushState({}, '', e.target.href);
    handleLocation();
  }
  
  const routers = {
    '/': './pages/main.html',
    '/actions_set_a': './pages/actions_set_a.html',
    '/actions_set_b': './pages/actions_set_b.html',
    '/animals_set_a': './pages/animals_set_a.html',
    '/animals_set_b': './pages/animals_set_b.html',
    '/clothes': './pages/clothes.html',
    '/emotions': './pages/emotions.html',
    '/food': './pages/food.html',
    '/fairytales': './pages/fairytales.html',
    '/statistic': './pages/statistic.html'
  }
  
  const handleLocation = async () => {
    const path = window.location.pathname;
    const html = await fetch(routers[path]).then((data) => data.text());
    document.querySelector('.container').innerHTML = html;
  }
  
  window.onpopstate = handleLocation;
  window.route = route;
  handleLocation();


/*
Burger menu
*/
const navigation = document.getElementById("mySidenav");
const openButton = document.querySelector(".menu-button");
const closeButton = document.querySelector(".close-button");
const background = document.querySelector(".sidenav-background");

function openNav() {
  navigation.style.width = "300px";
  body.style.overflow = 'hidden';
  background.classList.add('active');
}
  
function closeNav() {
  navigation.style.width = "0";
  body.style.overflow = '';
  background.classList.remove('active');
}

openButton.addEventListener("click", openNav);
closeButton.addEventListener("click", closeNav);

document.addEventListener('click', (e) => {
  if(e.target === background) {
    closeNav();
  }
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

