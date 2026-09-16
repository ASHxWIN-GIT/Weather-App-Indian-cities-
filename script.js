const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");

// Coordinates mapping for Indian cities (Latitude & Longitude)
const cityCoordinates = {
    "mumbai": { lat: 19.0760, lon: 72.8777, name: "Mumbai" },
    "delhi": { lat: 28.6139, lon: 77.2090, name: "Delhi" },
    "bengaluru": { lat: 12.9716, lon: 77.5946, name: "Bengaluru" },
    "chennai": { lat: 13.0827, lon: 80.2707, name: "Chennai" },
    "kolkata": { lat: 22.5726, lon: 88.3639, name: "Kolkata" },
    "hyderabad": { lat: 17.3850, lon: 78.4867, name: "Hyderabad" },
    "ahmedabad": { lat: 23.0225, lon: 72.5714, name: "Ahmedabad" },
    "pune": { lat: 18.5204, lon: 73.8567, name: "Pune" },
    "jaipur": { lat: 26.9124, lon: 75.7873, name: "Jaipur" },
    "bhopal": { lat: 23.2599, lon: 77.4126, name: "Bhopal" },
    "raipur": { lat: 21.2514, lon: 81.6296, name: "Raipur" },
    "bhilai": { lat: 21.1938, lon: 81.3509, name: "Bhilai" },
    "bilaspur": { lat: 22.0797, lon: 82.1391, name: "Bilaspur" }
};

async function checkWeather(cityName) {
    const cityKey = cityName.toLowerCase().trim();
    const cityData = cityCoordinates[cityKey];

    if (!cityData) {
        alert("City not found! Please search for a city listed on the card.");
        return;
    }

    // Live API call to Open-Meteo (No API key needed)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityData.lat}&longitude=${cityData.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const current = data.current;

        document.getElementById("city").innerText = cityData.name;
        document.getElementById("temp").innerText = Math.round(current.temperature_2m) + "°C";
        document.getElementById("humidity").innerText = current.relative_humidity_2m + "%";
        document.getElementById("wind").innerText = Math.round(current.wind_speed_10m) + " km/h";

        // Map WMO Weather Codes to icons
        const code = current.weather_code;
        if (code === 0) {
            weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png"; // Clear
        } else if (code >= 1 && code <= 3) {
            weatherIcon.src = "https://openweathermap.org/img/wn/04d@2x.png"; // Clouds
        } else if (code >= 51 && code <= 67) {
            weatherIcon.src = "https://openweathermap.org/img/wn/09d@2x.png"; // Drizzle/Rain
        } else if (code >= 80 && code <= 82) {
            weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png"; // Heavy Rain
        } else if (code >= 95) {
            weatherIcon.src = "https://openweathermap.org/img/wn/11d@2x.png"; // Thunderstorm
        } else {
            weatherIcon.src = "https://openweathermap.org/img/wn/50d@2x.png";
        }
    } catch (error) {
        alert("Unable to fetch live weather data. Check your connection!");
    }
}

searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() !== "") {
        checkWeather(cityInput.value);
    }
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && cityInput.value.trim() !== "") {
        checkWeather(cityInput.value);
    }
});