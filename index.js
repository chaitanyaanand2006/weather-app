const cityName = document.getElementById("city-name") ;
const searchBtn = document.getElementById("search-btn") ;

const cityy = document.getElementById("city") ;
const tempp = document.getElementById("temperature") ;
const weatherr = document.getElementById("weather") ;
const humidityy = document.getElementById("humidity") ;
const windd = document.getElementById("wind") ;

function updateCity(cityname) {
    cityy.textContent = cityname ;
}

function updateTemp(temperature) {
    tempp.textContent = temperature+"°C" ;
}
function updateWeather(weather) {
    weatherr.textContent = weather ;
}

function updateHumidity(humidity) {
    humidityy.textContent = humidity+"%" ;
}

function updateWind(wind) {
    windd.textContent = wind+"m/s" ;
}
async function getWeather(cityname) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=cce751c99554b289f92f85f128a36f94&units=metric` ;
    document.getElementById("search-btn").textContent = "Searching..." ;
    const response = await fetch(url);
    const data = await response.json() ;
    if (!response.ok) {
        alert(data.message);
        document.getElementById("search-btn").textContent = "Search";
        return;
    }
    console.log(data);
    const temperature = data.main.temp ;
    const city = data.name ; 
    const weather = data.weather[0].description ;
    const humidity = data.main.humidity ;
    const wind = data.wind.speed ;
    updateTemp(Math.round(temperature)) ;
    updateWeather(weather) ;
    updateHumidity(humidity) ;
    updateWind(wind) ;
    updateCity(city) ;
    cityName.value = "";
    document.getElementById("search-btn").textContent = "Search" ;
}
// Selecting Element
function searchWeather() {
    if(cityName.value.trim() === "") {
        alert("Please Enter a valid City Name.");
    }
    else {
        getWeather(cityName.value);
    }
}
searchBtn.addEventListener("click", searchWeather);

cityName.addEventListener("keydown", function(event) {
    if(event.key === "Enter") {
        searchWeather();
    }
});


