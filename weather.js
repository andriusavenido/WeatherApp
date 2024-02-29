
function getWeather(){

    const apiKey = '26ae2431ac6fe6bd953b797ab0e0a359';
    const city = document.getElementById('city').value;

    if(!city){

        alert("Please Enter a valid city");
        return;

    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    //fetch

    fetch(currentWeatherUrl)
            .then(response => response.json())
            .then(data => {displayWeather(data);})
            .catch(error => {
                console.error('error fetching current weather data:', error);
                alert('Error fetching current weather data. Please try again.');
            });

    fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {displayHourlyForeCast(data.list);})
            .catch(error => {
                console.error('error fetching current weather data:', error);
                alert('Error fetching current weather data. Please try again.');
            });
}

function displayWeather(data){

    const tempDivInfo = document.getElementById('temperature-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    //clear previous weather information
    weatherInfoDiv.innerHTML='';
    hourlyForecastDiv.innerHTML ='';
    tempDivInfo.innerHTML = '';

    if (data.cod == '404'){ // handle error
        weatherInfoDiv.innerHTML=  `<p>${data.message}</p>`;
    }
    else{
        const cityName = data.name;
        const temperature = Math.round(data.main.temp -273.15); //celcius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = ` <p>${temperature}°C</p?` ;

        const weatherHtml= `
            <p>${cityName}</p>
            <p>${description}</p>
        ` ;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForeCast(hourlyData){

    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0,8);

    next24Hours.forEach(item =>{

        const dateTime = new Date(item.dt *1000);
        const hour = dateTime.getHours();
        const temperature = Math.round (item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class = "hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt = "Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;

    })
}

function showImage(){
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';

}

function removeImage(){
    
}