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
    '/': 'main.html',
    '/action-set-a': 'action-set-a.html',
    '/action-set-b': 'action-set-b.html',
    '/animal-set-a': 'animal-set-a.html',
    '/animal-set-b': 'animal-set-b.html',
    '/clothes': 'clothes.html',
    '/emotions': 'emotions.html',
    '/food': 'food.html',
    '/movement': 'movement.html',
    '/statistic': 'statistic.html'
  }
  
  const handleLocation = async () => {
    const path = window.location.pathname;
    const html = await fetch(routers[path]).then((data) => data.text());
    document.querySelector('.container').innerHTML = html;
  }
  
  window.onpopstate = handleLocation;
  window.route = route;
  handleLocation();