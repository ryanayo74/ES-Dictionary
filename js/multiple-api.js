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

// Search Button By Ryan

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

//End of Search Button

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


}

{

 //WEATHER by RYAN
const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("#back-icon");

var api;

inputField.addEventListener("keyup", e =>{
    // if user pressed enter btn and input value is not empty
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){ // if browser support geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=36b90ff89a52d49f85627b18ea50ed81`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords; // getting lat and lon of the user device from coords obj
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=36b90ff89a52d49f85627b18ea50ed81`;
    fetchData();
}

function onError(error){
    // if any error occur while getting user location then we'll show it in infoText
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    // getting api response and returning it with parsing into js obj and in another 
    // then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){
    if(info.cod == "404"){ // if user entered city name isn't valid
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        //getting required properties value from the whole weather information
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        // using custom weather icon according to the id which api gives to us
        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "icons/rain.svg";
        }
        
        //passing a particular weather info to a particular element
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
        arrowBack.classList.add("active");

    }
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
    arrowBack.classList.remove("active");
});

// toggle btn for Weather JS by ROME
const toggleSwitch = document.querySelector('#toggle-switch');

toggleSwitch.addEventListener('click', () => {
  toggleSwitch.classList.toggle('on');
});



// End Of Weather JS

}








//clear btn  by ROME
const inputTxt = document.getElementById('search-input');
const clearBtn = document.getElementById('clearBtn');


//clear btn update
const dictionaryTitles = document.querySelectorAll('#lefty a, #righty a');

clearBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const image = document.getElementById('image');

  document.querySelectorAll('#inputTxt, #audio, #definition, #part-of-speech, #thisword, #title').forEach(elem => elem.innerHTML = '');
  inputTxt.value = '';
  image.src = '';


  //clear btn DOM update
  dictionaryTitles.forEach(title => {
    title.classList.add('hidden');
  });

});




// Change color 
// const searchInput = document.getElementById('search-input');
// const searchBtn = document.getElementById('search-btn');
// const searchResult = document.getElementById('word');

// searchBtn.addEventListener('click', () => {
//   const searchTerm = searchInput.value;
//   if (searchTerm.trim() !== '') {
//     if (searchResult.textContent.includes(searchTerm)) {
//       searchResult.style.color = 'green';
//     } else {
//             searchResult.style.color = 'red';
//     }
//   }
// });

// Hide footer in sidebar when toggle is active

const toggleBtn = document.querySelector('.toggle');
const textToRemove = document.querySelector('.footer_copyright');

toggleBtn.addEventListener('click', () => {
  textToRemove.classList.toggle('footer_copyright_hidden');
});

// Hide words

const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const hiddenTexts = document.querySelectorAll('.hidden');

function showHiddenText() {
  hiddenTexts.forEach((text) => {
    text.classList.toggle('hidden', searchInput.value === '');
  });
}

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    showHiddenText();
  }
});

searchButton.addEventListener('click', () => {
  showHiddenText();
});

searchInput.addEventListener('input', () => {
  hiddenTexts.forEach((text) => {
    text.classList.add('hidden');
  });
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