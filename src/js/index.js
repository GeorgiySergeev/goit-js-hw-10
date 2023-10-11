import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

const selectRef = document.querySelector('.breed-select');
const container = document.querySelector('.cat-info');

selectRef.addEventListener('change', selectCatBreed);
selectRef.classList.add('is-hidden');
reportLoading();

fetchBreeds() // load all breeds
  .then(data => {
    const breeds = data.data;

    const murkup = breeds
      .map(({ id, name }) => {
        return `<option value="${id}">${name}</option>`;
      })
      .join('');
    selectRef.insertAdjacentHTML('beforeend', murkup);

    Notiflix.Loading.remove();
    selectRef.classList.remove('is-hidden');
  })
  .catch(error => {
    console.log(error.message);

    Notiflix.Loading.remove();
    reportError();
  });
//=============
function selectCatBreed(e) {
  // select breed
  e.preventDefault();
  reportLoading();
  container.innerHTML = '';

  const id = e.target.value;

  fetchCatByBreed(id)
    .then(data => {
      const imgUrl = data.url;
      const selectedBreed = data.breeds[0];

      const { name, description, temperament } = selectedBreed;

      const markup = `<img src="${imgUrl}" alt="" width ="400px">
    <h2 class="title">${name}</h2>
    <p class="img-discr">${description}</p>
    <p class="cat-options">${temperament}</p>`;
      Notiflix.Loading.remove();
      container.innerHTML = markup;
    })
    .catch(error => {
      reportError();
    });
}

function reportError() {
  return Notiflix.Report.failure('Sorry, ERROR!');
}

function reportLoading() {
  return Notiflix.Loading.standard('Loading...wait please!');
}
