import fetchRequest from './modules/fetchRequest.js';
import { renderGoods } from './modules/renderGoods.js';
import { renderSearch } from './modules/renderGoods.js';
import { renderFourNews } from './modules/renderGoods.js';
import { preload } from './modules/preload.js';

const news = document.querySelector('.new');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

const form = document.querySelector('.header__form');
console.log('form', form)
const searchTopic = document.querySelector('.search');
console.log('searchTopic', searchTopic)
const langSelect = document.querySelector('.header__lang-select');

langSelect.addEventListener('change', () => {
  console.log('смена язына на ' + `${langSelect.textContent}`);
  start();
  searchTopic.innerHTML = '';
  form.reset();
})

const initSearch = (data) => {
  console.log('initSearch', initSearch)
  news.innerHTML = '';
  return Promise.all([
    fetchRequest(`everything?q=${data}`, {
      callback: renderSearch,
      headers: {
        'X-Api-Key': 'e3348a594ddf4b52ba0ea024e1428837',
      },
    }),
    fetchRequest(`top-headlines?country=${langSelect.value}`, {
      callback: renderFourNews,
      headers: {
        'X-Api-Key': 'e3348a594ddf4b52ba0ea024e1428837',
      },
      lang: `${langSelect.value}`,
    })
  ]);
};

const start = () => {
  const startPage = new Promise((resolve) => {
    console.log('старуем');
    preload.show();
    resolve(
      fetchRequest(`top-headlines?country=${langSelect.value}`, {
        callback: renderGoods,
        headers: {
          'X-Api-Key': 'e3348a594ddf4b52ba0ea024e1428837',
        },
        lang: `${langSelect.value}`,
      })
    )
  });

  startPage.then(data => {
    console.log('удаляем прелоадер');
    preload.remove();
    header.classList.remove('visually-hidden');
    news.classList.remove('visually-hidden');
    footer.classList.remove('visually-hidden');
    news.innerHTML = '';
    news.append(data);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const dataSearch = Object.fromEntries(formData);
  console.log('dataSearch', dataSearch);
  initSearch(dataSearch.body).then(item => {
    searchTopic.innerHTML = '';
    news.innerHTML = '';
    searchTopic.append(item[0]);
    news.append(item[1]);

  });
});

start();