import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import getPicture from "./js/pixabay-api";
import render from "./js/render-functions";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const hitsContainer = document.querySelector('.gallery');
export { hitsContainer };

const inputQueryRef = document.querySelector('input');
const formRef = document.querySelector('form');
const loadMoreButtonRef = document.querySelector('.loader-button');
const loaderRef = document.querySelector('.loader');
const imagePerPage = 15;
let currentQuery = '';
let currentPage = 1;
let totalPages = undefined;

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  enableKeyboard: true,
});

function onShowLoader() {
  loaderRef.style.display = 'block';
}

function onHideLoader() {
  loaderRef.style.display = 'none';
}

loadMoreButtonRef.addEventListener('click', onLoadMore);
formRef.addEventListener('submit', onInputQuery);

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
    title: 'Error',
    message: "We're sorry, but you've reached the end of search results.",
    titleSize: '16px',
    titleLineHeight: '150%',
    messageSize: '16px',
    messageLineHeight: '150%',
    backgroundColor: '#ef4040',
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

async function onInputQuery(evt) {
  evt.preventDefault();
  const query = evt.currentTarget.elements.query.value.trim();
  try {
    if (query === '') {
      hitsContainer.innerHTML = "";
      emptyQuery();
      loadMoreButtonRef.hidden = true;
      currentPage = 1; // Reset currentPage when initiating a new search
      return;
    }
    onShowLoader();
    currentQuery = query;
    currentPage = 1; // Reset currentPage when initiating a new search
    const { hits, totalHits } = await getPicture(currentQuery, currentPage);
    if (totalHits > 0) {
      render(hits);
      onHideLoader();
      lightbox.refresh();
      const { height: cardHeight } = hitsContainer.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
      inputQueryRef.value = "";
      loadMoreButtonRef.hidden = false;
      totalPages = Math.ceil(totalHits / imagePerPage);
    } else {
      hitsContainer.innerHTML = "";
      noImage();
    }
  } catch (message) {
    onHideLoader();
    logMessage(message);
  }
}

async function onLoadMore() {
  try {
    onShowLoader();
    currentPage += 1;
    const { hits, totalHits } = await getPicture(currentQuery, currentPage);
    render(hits);
    const element = hitsContainer.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: element.height,
      behavior: "smooth",
    });
    lightbox.refresh();
    if (Math.ceil(totalHits / imagePerPage) !== currentPage) {
      loadMoreButtonRef.hidden = true;
      onHideLoader();
      endOfCollections();
    } 
  } catch (message) {
    onHideLoader();
    logMessage(message);
  }
}