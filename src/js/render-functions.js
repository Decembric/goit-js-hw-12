import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
  enableKeyboard: true,
});


const hitsContainer = document.querySelector('.gallery');

export { hitsContainer, render }; 
function render(hits) {
  hitsContainer.innerHTML = '';
  const hitsRef = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<div class="gallery">
            <ul>
        <li><a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}"/></a></li>
          <li><p>Likes ${likes}</p></li>
          <li>
            <p>Views ${views}</p>
          </li>
          <li><p>Comments ${comments}</p></li>
          <li><p>Downloads ${downloads}</p></li>
        </ul>
        </div>`
  });
  hitsContainer.insertAdjacentHTML('beforeend', hitsRef.join(''));
  lightbox.refresh();
};