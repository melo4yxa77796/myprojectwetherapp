function showTime() {
    let currentTime = new Date();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let currentDay =days[currentTime.getDay()];
    let currentHour = currentTime.getHours();
    if (currentHour<10){
      currentHour=`0${currentHour}`;
    }
    
    
    let currentMinute = currentTime.getMinutes();
    if(currentMinute<10){
      currentMinute=`0${currentMinute}`;
    }
    
    return `${currentDay} ${currentHour}:${currentMinute}`;

  }
  
  let date = document.querySelector(".date");
  date.innerHTML = showTime();
    
function FormData(){
  let Time=new Date();
  let mounth=[
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ]
  let days=[
    "31",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    
  ]
  let dayMounth=days[Time.getDay()];
  let year=Time.getFullYear();
  let currentmounth=mounth[Time.getMonth()];
  return ` Today: ${dayMounth}.${currentmounth}.${year}`;
}

  let timeShow=document.querySelector(".showTime");
  timeShow.innerHTML=FormData();
  
  function search(event) {
    event.preventDefault();
  
    let searchInput = document.querySelector("#search-text-input");
    let h2 = document.querySelector("h2");
  
    h2.innerHTML = `${searchInput.value}`;
  }
  let formCity = document.querySelector("#search-form");
  
  formCity.addEventListener("submit", search);
  
  function showWeather(response) {
    let temp = Math.round(celsiusTemperature);
    let cityName = response.data.name;
    let humid = Math.round(response.data.main.humidity);
    let windSpeed = Math.round(response.data.wind.speed);
    let fallout = response.data.weather[0].main;
    let iconElement=document.querySelector("#icon");
    
    celsiusTemperature=response.data.main.temp;

    document.querySelector("#city-name").innerHTML = `${cityName}`;
    document.querySelector("#celisium").innerHTML = `${temp}`;
    document.querySelector(".weather").innerHTML = ` ${fallout}`;
    document.querySelector("#wind-speed").innerHTML = `Wind:${windSpeed} m/s`;
    document.querySelector("#humidity").innerHTML = `Humidity:${humid}%`;
    let iconUrl=`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    iconElement.setAttribute("src", iconUrl);
    iconElement.setAttribute("alt",response.data.weather[0].description);
  }
  
  function handlePosition(position) {
    let apiKey = "3fc4a1a542593e4089e587a81b28f31f";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showWeather);
  }
  
  function getWeatherCity(response) {
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    let apiKey = "3fc4a1a542593e4089e587a81b28f31f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  function getSearchCity() {
    let input = document.getElementById("search-text-input").value;
    let searchInput = input.toLowerCase().trim();
    let apiKey = "3fc4a1a542593e4089e587a81b28f31f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getWeatherCity);
  }
  function enterPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("location-search").click();
    }
  }
  
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(handlePosition);
  }
  let currentButton = document.querySelector("#current");
  currentButton.addEventListener("click", getCurrentPosition);
  let searchInput = document.getElementById("search-text-input");
  searchInput.addEventListener("keypress", enterPress);
  let submitButton = document.querySelector("#location-search");
  submitButton.addEventListener("click", getSearchCity);
   
function showFahrenheitTemperature(event){
  event.preventDefault();
  
  let temperatureElement=document.querySelector("#celisium");
  let fahrenheitTemperature=(celsiusTemperature*9/5)+32;
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}
let celsiusTemperature=null;

  let fahrenheitLink=document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click",showFahrenheitTemperature);

function showCelsiusTemperature(event){
  event.preventDefault();
  
  let temperatureElement=document.querySelector("#celisium");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
}


  let celsiusLink=document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click",showCelsiusTemperature);