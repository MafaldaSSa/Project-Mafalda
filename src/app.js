function formatDate(date){
	let days=["Sunday", "Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday"];
	let day=days[date.getDay()];
	console.log(day);
	let dayMonth=date.getDate();
	let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
	let month=months[date.getMonth()];
	console.log(month);
	let hour=date.getHours();
	if (hour < 10) {
		hour = `0${hour}`;}
	let minutes=date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;}
	return `${day}, ${month} ${dayMonth}, ${hour}:${minutes}`;
}
let h1 = document.querySelector("h1");
let now=new Date();
h1.innerHTML = formatDate(now);
var currentTime = new Date ()
var hour = currentTime.getHours()
if (hour > 6 && hour <= 10){
document.body.style.backgroundImage="url('src/sunrise.jpg')";
} else if(hour > 10 && hour <= 17) {
document.body.style.backgroundImage="url('src/day.jpg')";
} else if(hour > 17 && hour <= 19) {
document.body.style.backgroundImage="url('src/sunset.jpg')";
} else {
document.body.style.backgroundImage="url('src/night.jpg')";
}
function showTemperature (response){
document.querySelector("h2").innerHTML=response.data.name
document.querySelector("#temperature").innerHTML=Math.round(response.data.main.temp);
document.querySelector("#citySearch").innerHTML=response.data.name;
document.querySelector("#detailWeather").innerHTML = response.data.weather[0].main;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
celsiusTemperature = response.data.main.temp;
getForecast(response.data.coord);
}
function search(event) {
event.preventDefault();
let apiKey = "864d5a1a8b7f8f9de964112df48b15f7";
let city=document.querySelector("#citySearch").value;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
	}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch.form-control").value;
  search(city);
}
function searchLocation(position) {
	let apiKey = "864d5a1a8b7f8f9de964112df48b15f7";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(showTemperature);
  }
function getCurrentLocation(event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);}
let searchForm = document.querySelector("#navbar");
searchForm.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);
function showFahrenheit (event){
event.preventDefault();
let fahrenheitTemperature=(celsiusTemperature * 9) / 5 + 32;
celsiusClick.classList.remove("active");
fahrenheitClick.classList.add("active");
let temperatureElement=document.querySelector("#temperature");
temperatureElement.innerHTML=Math.round(fahrenheitTemperature)
}
function showCelsius (event){
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
celsiusClick.classList.add("active");	
fahrenheitClick.classList.remove("active");
temperatureElement.innerHTML=Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
let fahrenheitClick = document.querySelector("#fahrenheit");
fahrenheitClick.addEventListener("click", showFahrenheit);
let celsiusClick=document.querySelector("#celsiusClick");
celsiusClick.addEventListener("click", showCelsius);
function getForecast(coordinates) {
let apiKey = "864d5a1a8b7f8f9de964112df48b15f7";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showForecast);
}
function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
return days[day];
}  
function showForecast (response){
let forecast = response.data.daily;
let forecastElement=document.querySelector("#forecast");
let forecastHTML = `<div class="row">`;
forecast.forEach (function (forecastDay, index) {
	if (index < 6){
  forecastHTML =forecastHTML +
	`
	<div class="col-2">
	<div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
	<img
	  src="http://openweathermap.org/img/wn/${
		forecastDay.weather[0].icon
	  }@2x.png"
	  alt=""
	  width="42"
	/>
	<div class="weather-forecast-temperatures">
	  <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max
	  )}° </span>
	  <span class="weather-forecast-temperature-min"> ${Math.round(
		forecastDay.temp.min
	  )}° </span>
	</div>
  </div>
`;
}
});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}
function search(city) {
	let apiKey = "864d5a1a8b7f8f9de964112df48b15f7";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(showTemperature);
  }
search("Lisbon");
