import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/';
const API_KEY = '42373349-27b23dee84583d41aca0b8d31';


export default async function getPicture(query, page = 1) {
  const response = await axios.get('api/', {
    params: {
      key: API_KEY,
      per_page: 15,
      page,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return response.data;
}