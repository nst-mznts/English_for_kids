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
    '/activities': './pages/activities.html',
    '/nature': './pages/nature.html',
    '/animals': './pages/animals.html',
    '/body': './pages/body.html',
    '/clothes': './pages/clothes.html',
    '/emotions': './pages/emotions.html',
    '/food': './pages/food.html',
    '/home': './pages/home.html',
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