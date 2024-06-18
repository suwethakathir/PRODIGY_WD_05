document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'fe3ab27f2d6763ff25f9cfdba3aaf39c'; // Replace with your OpenWeatherMap API key
    const weatherInfo = document.getElementById('weatherInfo');
    const locationElement = document.getElementById('location');
    const descriptionElement = document.getElementById('description');
    const temperatureElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const windElement = document.getElementById('wind');

    document.getElementById('getLocation').addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeatherData(`lat=${lat}&lon=${lon}`);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });

    document.getElementById('getWeatherByCity').addEventListener('click', () => {
        const city = document.getElementById('cityInput').value;
        if (city) {
            fetchWeatherData(`q=${city}`);
        } else {
            alert('Please enter a city name.');
        }
    });

    function fetchWeatherData(query) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    alert('City not found.');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data.');
            });
    }

    function displayWeather(data) {
        locationElement.textContent = `Location: ${data.name}, ${data.sys.country}`;
        descriptionElement.textContent = `Weather: ${data.weather[0].description}`;
        temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
        windElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    }
});
