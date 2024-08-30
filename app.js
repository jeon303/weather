// app.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded');

    const tg = window.Telegram.WebApp;
    console.log('Telegram WebApp object:', tg);
    tg.expand();

    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');

    // Replace YOUR_OPENWEATHERMAP_API_KEY with your actual API key, without quotes
    const apiKey = 14ab476b8e60f112e2cfe1bf51db276b;
    console.log('API Key set (should not be undefined):', apiKey);

    function getWeather(latitude, longitude) {
        console.log(`Fetching weather for lat: ${latitude}, lon: ${longitude}`);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log('Weather data received:', data);
                locationElement.textContent = `Location: ${data.name}`;
                temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
                descriptionElement.textContent = `Description: ${data.weather[0].description}`;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                locationElement.textContent = 'Error fetching weather data';
            });
    }

    if (navigator.geolocation) {
        console.log('Geolocation is supported');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Position received:', position);
                const { latitude, longitude } = position.coords;
                getWeather(latitude, longitude);
            },
            (error) => {
                console.error('Error getting location:', error);
                locationElement.textContent = 'Unable to retrieve location';
            }
        );
    } else {
        console.log('Geolocation is not supported');
        locationElement.textContent = 'Geolocation is not supported by this browser';
    }
});
