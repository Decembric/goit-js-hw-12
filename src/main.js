import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import getPicture from './js/pixabay-api';
import render from './js/render-functions';

const hitsContainer = document.querySelector('.gallery');
const inputQueryRef = document.querySelector('input[name="query"]');
const formRef = document.querySelector('form');
const loadMoreButtonRef = document.querySelector('.loader-button');
const loaderRef = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  enableKeyboard: true,
});

export { hitsContainer, lightbox };

const imagePerPage = 15;
let currentQuery = '';
let currentPage = 1;

function onShowLoader() {
  loaderRef.style.display = 'block';
}

function onHideLoader() {
  loaderRef.style.display = 'none';
}

function emptyQuery() {
  iziToast.show({
    title: 'Error',
    message: 'Please, enter a non-blank line',
    titleSize: '16px',
    titleLineHeight: '150%',
    messageSize: '16px',
    messageLineHeight: '150%',
    backgroundColor: '#ef4040',
    position: 'bottomRight',
  });
}

function noImage() {
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
}

function endOfCollections() {
  iziToast.show({
    title: 'Info',
    message: "We're sorry, but you've reached the end of search results.",
    titleSize: '16px',
    titleLineHeight: '150%',
    messageSize: '16px',
    messageLineHeight: '150%',
    backgroundColor: '#6d6d6d',
    position: 'bottomRight',
  });
}

function logMessage(message) {
  iziToast.show({
    title: 'Error',
    message,
    titleSize: '16px',
    titleLineHeight: '150%',
    messageSize: '16px',
    messageLineHeight: '150%',
    backgroundColor: '#ef4040',
    position: 'bottomRight',
  });
}

async function onInputQuery(event) {
  event.preventDefault();
  const query = inputQueryRef.value.trim();
  if (query === '') {
    hitsContainer.innerHTML = '';
    emptyQuery();
    loadMoreButtonRef.hidden = true;
    return;
  }
  onShowLoader();
  currentQuery = query;
  currentPage = 1;
  try {
    const { hits, totalHits } = await getPicture(currentQuery, currentPage);
    if (totalHits > 0) {
      hitsContainer.innerHTML = '';
      render(hits);
      onHideLoader();
      loadMoreButtonRef.hidden = false;
    } else {
      hitsContainer.innerHTML = '';
      noImage();
      loadMoreButtonRef.hidden = true;
    }
  } catch ({ message }) {
    onHideLoader();
    logMessage(message);
  }
}

async function onLoadMore() {
  currentPage += 1;
  onShowLoader();
  try {
    const { hits, totalHits } = await getPicture(currentQuery, currentPage);
    render(hits);
    const totalPages = Math.ceil(totalHits / imagePerPage);
    if (currentPage >= totalPages) {
      loadMoreButtonRef.hidden = true;
      endOfCollections();
    }
  } catch ({ message }) {
    logMessage(message);
  } finally {
    onHideLoader();
  }
}

formRef.addEventListener('submit', onInputQuery);
loadMoreButtonRef.addEventListener('click', onLoadMore);
