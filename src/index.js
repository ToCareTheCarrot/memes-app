import axios from 'axios';
import qs from 'query-string';

const apiUrl = 'https://api.imgflip.com/get_memes';
const amountOfMemeInput = document.querySelector('.first');
const form = document.querySelector('.form');
const memeContainer = document.querySelector('.memeContainer');
const body = document.querySelector('body');
const input1 = document.createElement('input');
const input2 = document.createElement('input');
const inputHidden = document.createElement('input');
const apiPost = 'https://api.imgflip.com/caption_image';
const form1 = document.createElement('form');


form.onsubmit = (e) => {
    e.preventDefault();
    getMemes();
}

async function getMemes(){

    const response = await axios(`${apiUrl}`);
    const memes = response.data.data.memes;
    const numberOfMemes = amountOfMemeInput.value;

    const selectedMemes = [];
    for (let i = 0; i < numberOfMemes; i++){
      selectedMemes.push(memes[i]);
    }

    renderMemes(selectedMemes);
}

async function renderMemes(selectedMemes){
    memeContainer.innerHTML = '';
    inputHidden.classList.add('hidden');
    body.appendChild(inputHidden);
    console.log(selectedMemes);

    for (let i = 0; i < selectedMemes.length; i++){
      const img = document.createElement('img');
      img.setAttribute('src', selectedMemes[i].url);
      img.classList.add('picture');
      img.addEventListener('click',() => {
        inputHidden.setAttribute('data-id', selectedMemes[i].id);
        img.classList.add('marked');
      })
      memeContainer.appendChild(img);
    }

    const div = document.createElement('div');
    const btn = document.createElement('button');
    form1.classList.add('form');
    div.classList.add('row');
    btn.classList.add('btn');
    btn.textContent = 'Сгенерировать';
    div.appendChild(input1);
    div.appendChild(input2);
    div.appendChild(btn);
    form1.appendChild(div);
    body.appendChild(form1);
}

form1.onsubmit = (e) => {
    e.preventDefault();
    const requestData = qs.stringify(
        {
            template_id: inputHidden.dataset.id,
            username: 'g_user_107257642549096835361',
            password: '1234',
            text0: input1.value,
            text1: input2.value,
        }
    );
    sendTextForMem(requestData);
}

async function sendTextForMem(requestData){

    const response1 = await axios.post( apiPost, requestData);
    const wantedMem = response1.data.data.url;
    createMem(wantedMem);

}

function createMem(wantedMem){
    const imgMem = document.createElement('img');
    imgMem.setAttribute('src', wantedMem);
    body.appendChild(imgMem);
}











// btn.onclick = () => {
//     console.log('нажалась');
//     getMemes().then(function(response){
//     const memes = response.data.data.memes;
//     console.log(memes);
//     const memeContainer = [];
//     for (let i = 0; i < numberOfMemes; i++){
//       memeContainer.push(memes[i]);
//     }
//     console.log(memeContainer);
//   });
// }

// async function getMemes() {
//     const data = await axios(`${apiUrl}`);
//     return data;
// }