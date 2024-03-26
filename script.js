const submitButton = document.querySelector('#submit-button')

const submitForm = function() {
    const userInput = document.querySelector('#location-input');
    if(userInput.value == ''){
        alert("Valid Location is required");
    }
    let userLocation = userInput.value;
    searchWeather(userLocation);
}

const eightHourForecast = function(currentHour) {
    const forecastHours = [];
    let startingHour;
    
    (currentHour + 6) > 23 ? startingHour = 18 : startingHour=currentHour
    const finalHour = startingHour + 6;

    for(let i = startingHour; i < finalHour; i++){
        forecastHours.push(i);
    }
    return forecastHours;
}

const convertHour = function(hour) {
    if(hour > 12){
        return hour-12 + ' pm'
    } else {
        return hour + ' am'
    }
}

const generateCurrentWeather = function(today, location){
    console.log(today)
    console.log(location)
    const currentWeatherDiv = document.querySelector('.current-weather');
    
    
    
    let currentTime = new Date().getHours();
    const forecastHours = eightHourForecast(currentTime);
    //generate hourly forecast cards
    forecastHours.forEach((hour) => {
        const hourlyWeatherDiv = document.createElement('div');
        const hourSpan = document.createElement('span');
        const hourImage = document.createElement('img');
        const hourTempSpan = document.createElement('span');

        const hourTempF = today.hour[hour].temp_f;
        const hourTempC = today.hour[hour].temp_c;

        hour === currentTime ? hourSpan.textContent = 'Now' : hourSpan.textContent= convertHour(hour);
        hourImage.src = today.hour[hour].condition.icon;
        hourTempSpan.textContent=Math.floor(hourTempF) + '°';
        hourlyWeatherDiv.appendChild(hourSpan)
        hourlyWeatherDiv.appendChild(hourImage)
        hourlyWeatherDiv.appendChild(hourTempSpan)
        currentWeatherDiv.appendChild(hourlyWeatherDiv);

        hourlyWeatherDiv.classList.add('hourly-weather')
        })

        currentWeatherDiv.classList.add('current-weather')
}

//assign data from API and create 5-day forecast
const generateForecastCards = function(day) {
    const forecastContainer = document.querySelector('.forecast-container');
    //get date and name of day
    const dayDate = day.date;
    const utcDay = new Date(dayDate).getUTCDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayName = dayNames[utcDay];
    const shortDate = dayDate.slice(5);

    //get min/max temp and rain %
    const minTempF = Math.floor(day.day.mintemp_f);
    const maxTempF = Math.floor(day.day.maxtemp_f);
    const minTempC = Math.floor(day.day.mintemp_c);
    const maxTempC = Math.floor(day.day.maxtemp_C);
    const dayImage = day.day.condition.icon;
    const dayRainChance = day.day.daily_chance_of_rain;

    //create elements needed to display data
    const forecastCard = document.createElement('div');
    const dayNameSpan = document.createElement('span');
    const dayDateSpan = document.createElement('span');
    const minTempSpan = document.createElement('span');
    const maxTempSpan = document.createElement('span');
    const dayImageImg = document.createElement('img');
    const rainChanceSpan = document.createElement('span');
    
    //Day + date = header of card
    const forecastHeader = document.createElement('div');
    dayNameSpan.textContent=dayName;
    dayDateSpan.textContent=shortDate;
    forecastHeader.appendChild(dayNameSpan);
    forecastHeader.appendChild(dayDateSpan);
    forecastCard.appendChild(forecastHeader);

    //low to high temp display
    const lowToHighDiv = document.createElement('div');
    const arrowSpan = document.createElement('span');
    minTempSpan.textContent=minTempF + '°';
    arrowSpan.textContent = '→'
    maxTempSpan.textContent=maxTempF + '°';
    lowToHighDiv.appendChild(minTempSpan);
    lowToHighDiv.appendChild(arrowSpan);
    lowToHighDiv.appendChild(maxTempSpan);
    forecastCard.appendChild(lowToHighDiv);

    //weather image + rain%
    const bottomForeCastDiv = document.createElement('div');
    const rainChanceDiv = document.createElement('div')
    dayImageImg.src = dayImage;
    dayImageImg.alt = "icon displaying the day's forecast";
    rainChanceSpan.textContent=dayRainChance +'%';
    const rainSpan = document.createElement('span');
    rainSpan.textContent='of rain';
    rainChanceDiv.appendChild(rainChanceSpan);
    rainChanceDiv.appendChild(rainSpan);
    bottomForeCastDiv.appendChild(dayImageImg);
    bottomForeCastDiv.appendChild(rainChanceDiv);
    forecastCard.appendChild(bottomForeCastDiv);

    //append all to the container
    forecastContainer.appendChild(forecastCard);

    //class declarations
    forecastCard.classList.add('forecast-card')
    forecastHeader.classList.add('forecast-header')
    lowToHighDiv.classList.add('low-to-high')
    bottomForeCastDiv.classList.add('bottom-forecast')
    rainChanceDiv.classList.add('rain-chance')
}

const searchWeather = function(location) {

    fetch(`http://api.weatherapi.com/v1/forecast.json?key=868a48d93ab64879b79235103242103&q=${location}&days=6&aqi=no&alerts=no`, {mode: 'cors'})
        .then(function(res){
            return res.json();
        }).then(function(res){
            const locationData = res.location;
            const currentDay = res.forecast.forecastday.shift();
            const forecastDays = res.forecast.forecastday;
            generateCurrentWeather(currentDay, locationData);
            forecastDays.forEach(day => generateForecastCards(day));
            
        })
        .catch(function(err){
            console.log(err);
        })
}

submitButton.addEventListener('click', submitForm);

