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
    let currentDay = days[currentTime.getDay()];
    let currentHour = currentTime.getHours();
    let currentMinute = currentTime.getMinutes();
    return `${currentDay} ${currentHour}:${currentMinute}`;
  }
  
  let date = document.querySelector(".date");
  date.innerHTML = showTime();
  
  function search(event) {
    event.preventDefault();
  
    let searchInput = document.querySelector("#search-text-input");
    let h2 = document.querySelector("h2");
  
    h2.innerHTML = `${searchInput.value}`;
  }
  let formCity = document.querySelector("#search-form");
  
  formCity.addEventListener("submit", search);
  
  function showWeather(response) {
    let temp = Math.round(response.data.main.temp);
    let cityName = response.data.name;
    let humid = Math.round(response.data.main.humidity);
    let windSpeed = Math.round(response.data.wind.speed);
    let fallout = response.data.weather[0].main;
    document.querySelector("#city-name").innerHTML = `${cityName}`;
    document.querySelector("#celisium").innerHTML = `${temp}`;
    document.querySelector(".weather").innerHTML = ` ${fallout}`;
    document.querySelector("#wind-speed").innerHTML = `Wind:${windSpeed} m/s`;
    document.querySelector("#humidity").innerHTML = `Humidity:${humid}%`;
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
  