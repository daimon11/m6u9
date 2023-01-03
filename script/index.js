import fetchRequest from './modules/fetchRequest.js';
import { renderGoods } from './modules/renderGoods.js';
import { renderSearch } from './modules/renderGoods.js';
import { renderFourNews } from './modules/renderGoods.js';
import preload from './modules/preload.js';

const news = document.querySelector('.new');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

const newsTopics = document.querySelector('.new');

const form = document.querySelector('.header__form');
const searchTopic = document.querySelector('.search');

const initSearch = (data) => {
  newsTopics.innerHTML = '';
  return Promise.all([
    fetchRequest(`everything?q=${data}`, {
      callback: renderSearch,
      headers: {
        'X-Api-Key': 'e3348a594ddf4b52ba0ea024e1428837',
      },
    }),
    fetchRequest('top-headlines?country=ru', {
      callback: renderFourNews,
      headers: {
        'X-Api-Key': 'e3348a594ddf4b52ba0ea024e1428837',
      },
    })
  ]);
};

const startPage = new Promise((resolve) => {
  preload.show();
  resolve(
    fetchRequest('top-headlines?country=ru', {
      callback: renderGoods,
      headers: {
        'X-Api-Key': 'e3348a594ddf4b52ba0ea024e1428837',
      },
    })
  )
});

startPage.then(data => {
  preload.remove();
  header.classList.remove('visually-hidden');
  news.classList.remove('visually-hidden');
  footer.classList.remove('visually-hidden');
  newsTopics.append(data);
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const dataSearch = Object.fromEntries(formData);
  console.log('dataSearch', dataSearch);
  initSearch(dataSearch.body).then(item => {
    searchTopic.innerHTML = '';
    newsTopics.innerHTML = '';
    searchTopic.append(item[0]);
    newsTopics.append(item[1]);
  });
});