import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const selectRef = document.querySelector('.breed-select');
const container = document.querySelector('.cat-info');

selectRef.addEventListener('change', selectCatBreed);
selectRef.classList.add('is-hidden');
reportLoading();

// функции рендера разметки
function renderBreeds(arr) {
  // рендер всех пород котов в селект
  const murkup = arr
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  selectRef.insertAdjacentHTML('beforeend', murkup);
}

function renderCatCard(obj, img) {
  // рендер карточки с выбраной породой
  const { name, description, temperament } = obj;
  const markup = `<img src="${img}" alt="" width ="400px">
      <h2 class="title">${name}</h2>
      <p class="img-discr">${description}</p>
      <p class="cat-options">${temperament}</p>`;
  container.innerHTML = markup;
}
// логика обработки запросов
fetchBreeds()
  .then(data => {
    renderBreeds(data);
    selectRef.classList.remove('is-hidden');
  })
  .catch(error => {
    reportError();
  })
  .finally(i => {
    Notiflix.Loading.remove();
  });
//=============
function selectCatBreed(e) {
  // при выборе породы кота из селекта
  reportLoading();
  container.innerHTML = '';
  const id = e.target.value;

  fetchCatByBreed(id)
    .then(data => {
      const imgUrl = data[0].url;
      const selectedBreed = data[0].breeds[0];

      renderCatCard(selectedBreed, imgUrl);
    })
    .catch(error => {
      reportError();
    })
    .finally(e => {
      Notiflix.Loading.remove();
    });
}
// функции - репорты
function reportError() {
  return Notiflix.Report.failure('Sorry, ERROR!');
}

function reportLoading() {
  return Notiflix.Loading.standard('Loading...wait please!');
}
