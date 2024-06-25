import { hitsContainer, lightbox } from '../main';

export default function render(hits) {
  const hitsRef = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <li>
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
        <p>Likes: ${likes}</p>
        <p>Views: ${views}</p>
        <p>Comments: ${comments}</p>
        <p>Downloads: ${downloads}</p>
      </li>`;
  });
  hitsContainer.insertAdjacentHTML('beforeend', hitsRef.join(''));
  lightbox.refresh();
}
