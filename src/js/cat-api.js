import axios from 'axios';

const API_KEY =
  'live_f81sRxcssb4bvlytgn5CEppifDA0qXP8BO6mXmEJhOCrGLJYlUYjk1RVgFbPaQkm';
axios.defaults.headers.common['x-api-key'] = API_KEY;
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

//================Load all breeds
function fetchBreeds() {
  return axios
    .get('breeds')
    .then(response => {
      if (response.status !== 200) {
        throw new Error(resp.status);
      }
      return response; //бработка успешного запроса
    })
    .catch(error => {
      // обработка ошибки
      console.log(error.message);
    });
}

//==============Search by ID

function fetchCatByBreed(breedId) {
  return axios
    .get(`images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(resp.status);
      }
      return response.data[0]; //бработка успешного запроса
    })
    .catch(error => {
      // обработка ошибки
      console.log(error.message);
    });
}

export { fetchBreeds, fetchCatByBreed };
