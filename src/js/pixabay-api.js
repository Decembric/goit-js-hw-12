import { hitsContainer, render } from "./render-functions";
import axios from 'axios';
import iziToast from "izitoast";


const API_KEY = '42373349-27b23dee84583d41aca0b8d31';
 
let currentPage = 1
const loadMoreButtonRef = document.querySelector('.js-load');

function onLoadMore() {
  currentPage += 1
  getPicture(currentPage)
}

loadMoreButtonRef.addEventListener('click', onLoadMore)

const loaderRef = document.querySelector('.loader');
onHideLoaderText();
function onShowLoaderText() {
    loaderRef.style.display = 'block';
    
}

function onHideLoaderText() {
    loaderRef.style.display = 'none';
}

export default function getPicture(query, page = 1) {
  onShowLoaderText();
  const urlAPI = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;
  axios.get(urlAPI).then(res => res.data).then(({ hits, totalHits
  }) => {
    if (totalHits !== 0) {
      render(hits);
      onHideLoaderText();
    } else {
      onHideLoaderText();
      hitsContainer.innerHTML = "";
      iziToast.show({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        titleSize: '16px',
        titleLineHeight: '150%',
        messageSize: '16px',
        messageLineHeight: '150%',
        backgroundColor: '#ef4040',
        position: 'bottomRight',
      });
    };
  }).catch(error =>
    console.error(error)).finally();  
};