let apiWeatherKey = "3fd6432cc258ab6eb827a9d25e31b446";
let apiLocationKey = "pk.df337fe02a9705d89867a6f5f0986e33";
let currentCity = document.querySelector("#cityHeading");


function getCoordinates(){
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position){
  let latitude = position.coords.latitude.toString();
  let longitude = position.coords.longitude.toString();
  let coordinates = [latitude,longitude];
  
  findCurrentCity(coordinates);
}

function getCurrentWeather(response){
  navigator.geolocation.getCurrentPosition(findPosition);
}
function findPosition(position){
  let latitude = position.coords.latitude.toString();
  let longitude = position.coords.longitude.toString();
  let coordinates = [latitude,longitude];
  findCurrentCity(coordinates);
}
function findCurrentCity (coordinates){
  let latitude = coordinates[0];
  let longitude = coordinates[1];
  let apiLocationUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiWeatherKey}`;
  axios.get(apiLocationUrl).then(displayCurrentCity);
}
function displayCurrentCity(response){
  console.log(response);
  let city = response.data[0].name;
  currentCity.innerHTML = `${city}`;
  getWeather(city);
}


function updateDate(){
  let now = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[now.getDay()];
  let months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
  let month = months[now.getMonth()];
  let hours = now.getHours();
  if(hours < 10){
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if(minutes<10){
    minutes = `0${minutes}`;
  }
  let year = now.getFullYear();
  let h3 = document.querySelector("#date");
  h3.innerHTML= `${hours}:${minutes}, ${day}, ${month} ${now.getDate()}, ${now.getFullYear()}`;
}
function updateCity(event){
  event.preventDefault();
  let cityInput = document.querySelector("#exampleInputCity");
  getWeather(cityInput.value);
}

function getWeather(city){
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiWeatherKey}`;
  axios.get(apiUrl).then(displayWeather);
}
function displayWeather(response){
  let weatherElement = document.querySelector("#bigDegree");
  let searchedWeather = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#cityHeading");
  let humidityElement = document.querySelector("#Humidity");
  let humidity = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  let windSpeed = response.data.wind.speed;
  let mainIcon = document.querySelector("#weatherIcon");
  let icon = response.data.weather[0].icon;
  let desciptionElement = document.querySelector("#description");
  let description = response.data.weather[0].description;
  h1.innerHTML = `${response.data.name}`;
  weatherElement.innerHTML = `${searchedWeather}`;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${windSpeed} mph`;
  desciptionElement.innerHTML =`${description}`;
  mainIcon.setAttribute("src",` http://openweathermap.org/img/wn/${icon}@2x.png`) ;
  updateDate();
}

function displayFarenheit(event){
  event.preventDefault();
  let farenheit = Math.round((searchedWeather*(9/5))+32);
  let bigDegree = document.querySelector("#bigDegree");
  bigDegree.innerHTML = `${farenheit}`;
}
function displayCelcius(event){
  event.preventDefault();
  let bigDegree = document.querySelector("#bigDegree");
  bigDegree.innerHTML = `${searchedWeather}`;
}

updateDate();
getCoordinates();

let form = document.querySelector("#cityForm");
form.addEventListener("submit", updateCity);

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrentWeather);

let celciusLink = document.querySelector("#celciusLink");
celciusLink.addEventListener("click", displayCelcius);

let farenheitLink = document.querySelector("#farenheitLink");
farenheitLink.addEventListener("click", displayFarenheit);
