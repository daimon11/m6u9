const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');

  return container;
}

const createImg = (data) => {
  const img = document.createElement('img');
  img.classList.add('new__pic');
  img.src = data;
  img.alt = "Изображние для статьи";
  img.setAttribute('onerror', `this.onerror=null; this.src='./img/no-pic.png';`);

  return img;
}

const render = (data) => {
  console.log('render', data);
  const goods = data.map(item => {
    const img = createImg(item.urlToImage);
    const article = document.createElement('article');
    article.className = 'new__topic';
    article.innerHTML = `
    <a href="${item.url}" class="new__link" target="_blank">
      <h2 class="new__topic">${item.title}</h2>
    </a>
    <p class="new__paragraf">${item.description}</p>
    <div class="new__topic-footer">
      <time class="new__topic-time" datetime="${dateNow(item.publishedAt)}">${dateNow(item.publishedAt)}</time>
      ${(item.author) ?
        `<p class="new__topic-autor">${item.author}</p>` :
        `<p class="new__topic-autor">Автор неизвестен</p>`
      }
    </div>`;

    article.prepend(img);

    return article;
  });

  console.log(goods);
  return goods;
}

const dateNow = (date) => {
  const option = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }
  return (new Date(date).toLocaleString('en', option));
};

const renderFourNews = (err, data, searchData = null) => {
  if (err) {
    console.warn(err, data);
    return;
  }

  const container = createContainer();

  const title = document.createElement('h2');
  title.textContent = 'Свежие новости';
  title.classList.add('new__title');

  let arrNews = data.articles.slice(0, 4);
  console.log('renderFourNews', arrNews);

  const list = document.createElement('div');
  list.classList.add('new__list');

  const goods = render(arrNews);

  list.append(...goods);

  container.append(title, list);

  return container;
};

const renderSearch = (err, data, searchData) => {
  if (err) {
    console.warn(err, data);
    return;
  }

  const container = createContainer();

  const index = searchData.lastIndexOf('=');
  const nameWithoutExtension = searchData.slice(index + 1, (searchData.length));

  const list = document.createElement('div');
  list.classList.add('new__list');

  const title = document.createElement('h2');
  title.classList.add('new__title');

  let arrSearch = data.articles;

  if (arrSearch.length > 8) {
    arrSearch = arrSearch.slice(0, 8);
  }

  title.textContent = `По вашему запросу "${nameWithoutExtension}" найдено ${arrSearch.length} материалов`;

  const goods = render(arrSearch);

  list.append(...goods);

  container.append(title, list);

  return container;
}

const renderGoods = (err, data, searchData = null) => {
  if (err) {
    console.warn(err, data);
    return;
  }

  const container = createContainer();

  const list = document.createElement('div');
  list.classList.add('new__list');

  const title = document.createElement('h2');
  title.textContent = 'Свежие новости';
  title.classList.add('new__title');

  const goods = render(data.articles);

  list.append(...goods);

  container.append(title, list);

  return container;
};

export { renderGoods, renderSearch, renderFourNews};