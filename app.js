// app.js
document.addEventListener('DOMContentLoaded', () => {
    const tg = window.Telegram.WebApp;
    tg.expand();

    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');

    // Replace with your actual OpenWeatherMap API key
    const apiKey = 82dd722626bcdffd5cff82a6f8baeee6;

    function getWeather(latitude, longitude) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                locationElement.textContent = `Location: ${data.name}`;
                temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
                descriptionElement.textContent = `Description: ${data.weather[0].description}`;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeather(latitude, longitude);
            },
            (error) => {
                console.error('Error getting location:', error);
                locationElement.textContent = 'Unable to retrieve location';
            }
        );
    } else {
        locationElement.textContent = 'Geolocation is not supported by this browser';
    }
});
