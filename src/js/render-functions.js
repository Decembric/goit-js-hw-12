import { hitsContainer, lightbox } from "../main";

export default function render(hits) {
  const hitsRef = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<li><a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}"/></a></li>
          <li><p>Likes ${likes}</p></li>
          <li>
            <p>Views ${views}</p>
          </li>
          <li><p>Comments ${comments}</p></li>
          <li><p>Downloads ${downloads}</p></li>`
  });
  hitsContainer.insertAdjacentHTML('beforeend', hitsRef.join(''));
  lightbox.refresh();
};