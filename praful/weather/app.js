// Add your API key here
const API_KEY = `aec4638f070da9d17310eaefd6cf3a0f`;

const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

const getWeather = async (city) => {
    weather.innerHTML = "<h1 style='color:yellow'>Loading...</h1>"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return showWeather(data);
};

const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = "<h1>City Not Found</h1>";
        return;
    }
    else {
        weather.innerHTML = `
        <div>
        <img
            src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
            alt="Cloud-img"
          />
        </div>
        <div>
          <h2>${data.main.temp} ⁰C</h2>
          <h4>Clear</h4>
        </div>
        `;
    }
};


form.addEventListener("submit", function (event) {
    getWeather(search.value);
    event.preventDefault();
});