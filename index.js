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