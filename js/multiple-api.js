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




// // My Prototype Syntax - Waren Gador

const dictionaryApiKey = '98a198a3-a200-490a-ad48-98ac95b46d80';
const pexelsApiKey = 'P5QhWewHGb3ek9Mmq362jR0qT6BBSlPMLBg5iKE5RinKC3BblQGafGqA';
const openWeatherApiKey = '36b90ff89a52d49f85627b18ea50ed81';

// Search Button

//Variable for search-btn ID
const searchButton = document.getElementById('search-btn');
 
//Mouse
searchButton.addEventListener('click', (ev)=>{
  handleSearch();
});


//Keyboard Enter Key
document.addEventListener('keypress', (event)=>{
  // Variable Declaration for Enter key
  let keyCode = event.keyCode ? event.keyCode : event.which;

  //Value of enter key is 13
  if(keyCode === 13) {
    // call handleSearch function
    handleSearch();
  }
    
});


function handleSearch() {

  const searchQuery = document.getElementById('search-input').value;

  fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${searchQuery}?key=${dictionaryApiKey}`)
    .then(response => response.json())
    .then(data => {
      const definition = data[0].shortdef[0];
      const partOfSpeech = data[0].fl;
      const phonetic = data[0].hwi.prs[0].mw;

      // Make data appear on the screen
      const audio_box = document.getElementById('audio');
      document.getElementById('definition').innerHTML = definition;
      document.getElementById('part-of-speech').innerHTML = partOfSpeech;
      document.getElementById('thisword').innerHTML = phonetic;
      document.getElementById('title').innerHTML = searchQuery;



      // Make a history of search box by ROME
      const historyList = document.querySelector('.history ul');

      const searchHistory = inputTxt.value;
         if (searchHistory) {
           const li = document.createElement('li');
           li.textContent = searchHistory;
           historyList.appendChild(li);
      }
    


      audio_box.innerHTML = "";

      // if audio is available
      let sound_name = data[0].hwi.prs[0].sound.audio;
      if (sound_name) {
        soundRead(sound_name);
      }
       

      function soundRead(sound_name) {
        let sub_folder = sound_name.charAt(0);
        let sound_src = `https://media.merriam-webster.com/soundc11/${sub_folder}/${sound_name}.wav?key=${dictionaryApiKey}`;

        let aud = document.createElement('audio');
        aud.src = sound_src;
        aud.controls = true;
        audio_box.appendChild(aud)
      }

    });




  fetch(`https://api.pexels.com/v1/search?query=${searchQuery}`, {
    headers: {
      Authorization: pexelsApiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.photos[0].src.medium;
      document.getElementById('image').src = imageUrl;
    });

  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&amp;lon=${longitude}&amp;appid=${openWeatherApiKey}`)
      .then(response => response.json())
      .then(data => {
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        document.getElementById('temperature').innerHTML = temperature;
        document.getElementById('weather-description').innerHTML = weatherDescription;
      });
  });
}

//clear btn  by ROME
const inputTxt = document.getElementById('search-input');
const clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const image = document.getElementById('image');
  image.src = '';
  inputTxt.value = '';
  document.querySelectorAll('#inputTxt, #audio, #definition, #part-of-speech, #thisword, #title').forEach(elem => elem.innerHTML = '');
});



// Documentation here 

/*

-> Merriam Webster = https://dictionaryapi.com/products/json

-> Pexel API = https://www.pexels.com/api/documentation/

-> Open Weather API = https://openweathermap.org/guide


Assign to Rome , Ryan and Bernard 

Reconstruct by. Waren Gador

 Message: I will may add some designs for these 3 api with fetching elements and classes to provide.

*/

//Old version of Search Button

//const searchButton = document.getElementById('search-btn');

//searchButton.addEventListener('click', handleSearch);