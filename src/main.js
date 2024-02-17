import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import getPicture from "./js/pixabay-api";
import { hitsContainer } from "./js/render-functions";

const inputQueryRef = document.querySelector('input');
const formRef = document.querySelector('form');

formRef.addEventListener('submit', onInputQuery);

let query = ""

function onInputQuery(evt) {
  evt.preventDefault();
  query = inputQueryRef.value.trim();
  if (query === '') {
    hitsContainer.innerHTML = "";
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
    return
  } else {
    
    getPicture(query);
  }
  inputQueryRef.value = "";
}