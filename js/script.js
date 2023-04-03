
let toggle = document.querySelector('.toggle');
let nav = document.querySelector('#fixed-sidebar');
let contentarea = document.querySelector('#content-area');

toggle.onclick = function () {
    nav.classList.toggle('active');
    contentarea.classList.toggle('active');
}

let list = document.querySelectorAll('#fixed-sidebar li');

function linkactive() {
    list.forEach((item) =>
        item.classList.remove('hovered'));
    this.classList.add('hovered');
}

list.forEach((item) =>
    item.addEventListener('mouseover', linkactive));


const input = document.querySelector('input');
const btn = document.querySelector('.search-btn');
const dictionaryapi = document.querySelector('.dictionary-box');

async function dictionaryFn(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => res.json())

    return res[0]
}


btn.addEventListener('click', fetchandCreateCard)



async function fetchandCreateCard() {
    const data = await dictionaryFn(input.value)

    console.log(data)


    let partOfSpeechArray = []

    for (let i = 0; i < data.meanings.length - 1; i++) {
        partOfSpeechArray.push(data.meanings[i].partOfSpeech)
    }

    dictionaryapi.innerHTML = `


                <div class="left-content">
                <div class="property">
                <h2>Word :</h2>
                <span class="word">${data.word}</span>
            </div>
                </div>
                <div class="right-content">
                <div class="dic-left">
                    <div class="property">
                        <span class="word">Phonetics :</span>
                        <span class="word">${data.phonetic}</span>
                    </div>
                    <div class="property">
                        <span class="word">Definition </span>
                        <span class="word">${data.meanings[0].definitions[0].definition}</span>
                    </div>
                    <div class="property">
                        <span class="word">Example </span>
                        <span class="word">${data.meanings[0].definitions[0].example}</span>
                    </div>
                    <div class="property">
                        <span class="word">Parts of Speech </span>
                        <span class="word"> ${partOfSpeechArray.map(e => e).join(', ')} </span>
                    </div>
                </div>
                <div class="dic-right">
                    <div class="property">
                        <span class="word">
                        <audio controls src="${data.phonetics[0].audio}"></audio>
                        </span>
                    </div>
                </div>
            </div>           
    `
}





