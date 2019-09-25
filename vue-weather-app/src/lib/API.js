const proxy = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = '2d0f5e9bb766710891055f2dc0c7494c';
// const location = '37.8267,-122.4233';
const location = '12.9304,77.6784';
const API_URL = `${proxy}https://api.darksky.net/forecast/${API_KEY}/${location}`;

function getForecast() {
    return fetch(API_URL)
        .then(response => response.json());
}

export default {
    getForecast
}