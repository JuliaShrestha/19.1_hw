/*За допомогою запиту вивести виджет погоди. Ресурс API https://openweathermap.org/current

Також потрібно додати кнопку оновлення данних. 
ЗАДЕПЛОЇТИ
*/

const apiKey = '1845094fa284f13127fbe1fa218010d3';
const city = 'Kharkiv';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

function fetchWeatherData() {
    fetch(url)
        .then(response => response.json())
        .then(data => {

            const temperature = Math.round(data.main.temp);
            const feelsLike = Math.round(data.main.feels_like);
            const windSpeed = Math.round(data.wind.speed);

            document.getElementById('temp').innerHTML = `${temperature}°C`;
            document.getElementById('feels-like').innerHTML = `Feels like: ${feelsLike}°C`;
            document.getElementById('humidity').innerHTML = `Humidity: ${data.main.humidity}%`;
            document.getElementById('pressure').innerHTML = `Pressure: ${data.main.pressure} hPa`;
            document.getElementById('wind-speed').innerHTML = `Wind: ${windSpeed} м/с`;
            document.getElementById('description').innerHTML = data.weather[0].description;

            const iconCode = data.weather[0].icon;
            document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

function displayDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    const fullDate = now.toLocaleDateString('en-US', options);
    
    document.getElementById('full-date').textContent = fullDate;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();
    displayDate();
});

document.getElementById('refresh').addEventListener('click', fetchWeatherData);