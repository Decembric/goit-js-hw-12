import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import getPicture from "./js/pixabay-api";
import render from "./js/render-functions";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  enableKeyboard: true,
});

export {hitsContainer}

const hitsContainer = document.querySelector('.gallery');
const inputQueryRef = document.querySelector('input');
const formRef = document.querySelector('form');
const loadMoreButtonRef = document.querySelector('.js-load');
const loaderRef = document.querySelector('.loader');

let currentQuery = '';
let currentPage
let availablePages = 0;

onHideLoaderText();

function onShowLoaderText() {
    loaderRef.style.display = 'block';
    
}

function onHideLoaderText() {
    loaderRef.style.display = 'none';
}

function onButtonLoaderShow() {
  loadMoreButtonRef.style.display = 'show';
}

function onButtonLoaderHide() {
  loadMoreButtonRef.style.display = 'none';
}

loadMoreButtonRef.addEventListener('click', onLoadMore)

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

async function onInputQuery(evt) {
  evt.preventDefault();
  const query = evt.currentTarget.elements.query.value.trim();
  try {
    if (query === '') {
      emptyQuery();
      return
    }
    currentQuery = query;
    currentPage = 1
    const { hits, totalHits } = await getPicture(currentQuery, currentPage)
    inputQueryRef.value = "";
    if (totalHits !== 0) {
      render(hits);
      onHideLoaderText();
    } else {
      hitsContainer.innerHTML = "";
      noImage()
    };
    const { height: cardHeight } = hitsContainer.getBoundingClientRect();
window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
  } catch (error) {
    console.error(error)
  }
}
    
async function onLoadMore() {
  try {
    onShowLoaderText()
    currentPage += 1;
    const {hits, totalHits} = await getPicture(currentQuery, currentPage)
    if (totalHits !== 0) {
      render(hits);
      onHideLoaderText();
      onButtonLoaderShow()
    } else {
      hitsContainer.innerHTML = "";
      noImage()
    };
    const { height: cardHeight } = hitsContainer.firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
    lightbox.refresh();
    if (currentPage === availablePages) {
      error.endOfSearch();
      onButtonLoaderHide()
    }
  } catch (error) {
    console.error(error)
  } 
}
