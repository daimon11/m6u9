import { preloadImg } from './preload.js';

const titleNews = {
  ru: 'Свежие новости',
  rs: 'Најновије вести',
  hu: 'Legfrissebb hírek',
};

console.log(titleNews.rs);
console.log(placeholderValue.hu);

const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');

  return container;
}

const preloaderImg = (elem) => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay-img');
  overlay.innerHTML = `<svg width="41.5" height="30" viewBox="0 0 166 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M135.5 30L105.5 60H128C128 84.825 107.825 105 83 105C75.425 105 68.225 103.125 62 99.75L51.05 110.7C60.275 116.55 71.225 120 83 120C116.15 120 143 93.15 143 60H165.5L135.5 30ZM38 60C38 35.175 58.175 15 83 15C90.575 15 97.775 16.875 104 20.25L114.95 9.3C105.725 3.45 94.775 0 83 0C49.85 0 23 26.85 23 60H0.5L30.5 90L60.5 60H38Z" fill="black"/>
  </svg>
  `;
  elem.prepend(overlay)
}

const foo = (result, article) => {
  if (result.onload) {
    console.log('загрузилось');

  } else {
    foo(result, article);
    conso
  }

}

const createImg = (data, article) => {

  const imgLoad = new Promise((resolve, reject) => {
    preloaderImg(article);
    const img = new Image();
    img.src = data;

    resolve(img);

    reject(img.setAttribute('src', './img/no-pic.png'));
  })

  imgLoad.then(result => {
    article.querySelector('.overlay-img').remove();
    article.prepend(result);
  }

  );

};

const render = (data) => {
  console.log('render', data);
  const goods = data.map(item => {


    // let img = [];
    // createImg(item.urlToImage).then(data => {
    //   img.push(data);
    //   console.log(data);
    //   console.log(img);
    // });

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
    createImg(item.urlToImage, article);

    if (!(item.description)) article.querySelector('.new__paragraf').remove();

      return article;
  });

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

const renderFourNews = (err, data, searchData = null, lang) => {
  if (err) {
    console.warn(err, data);
    return;
  }

  const container = createContainer();

  const title = document.createElement('h2');
  title.textContent = titleNews[`${lang}`];
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

const renderSearch = (err, data, searchData, lang) => {
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
  console.log(goods);
  list.append(...goods);

  container.append(title, list);

  return container;
}

const renderGoods = (err, data, option = null, lang) => {
  console.log('renderGoods data', data);
  console.log('renderGoods lang', titleNews[`${lang}`]);
  if (err) {
    console.warn(err, data);
    return;
  }

  const container = createContainer();

  const list = document.createElement('div');
  list.classList.add('new__list');

  const title = document.createElement('h2');
  title.textContent = titleNews[`${lang}`];
  title.classList.add('new__title');

  const goods = render(data.articles);

  list.append(...goods);

  container.append(title, list);

  return container;
};

export { renderGoods, renderSearch, renderFourNews };