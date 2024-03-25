const submitButton = document.querySelector('#submit-button')

const submitForm = function() {
    const userInput = document.querySelector('#location-input');
    let userLocation = userInput.value;
    searchWeather(userLocation);
}

const generateForecastCards = function(day) {
    //get date and name of day
    const dayDate = day.date;
    const utcDay = new Date(dayDate).getUTCDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayName = dayNames[utcDay];
    const shortDate = dayDate.slice(5);

    //get temperature low, high, and average
    const averageTempF = Math.floor(day.day.avgtemp_f);
    const minTempF = Math.floor(day.day.mintemp_f);
    const maxTempF = Math.floor(day.day.maxtemp_f);

    const minTempC = Math.floor(day.day.mintemp_c);
    const averageTempC = Math.floor(day.day.avgtemp_c)
    const maxTempC = Math.floor(day.day.maxtemp_C);

    const dayImage = day.day.condition.icon;

    

}

const searchWeather = function(location) {

    fetch(`http://api.weatherapi.com/v1/forecast.json?key=868a48d93ab64879b79235103242103&q=${location}&days=6&aqi=no&alerts=no`, {mode: 'cors'})
        .then(function(res){
            return res.json();
        }).then(function(res){
            const currentDay = res.forecast.forecastday.shift();
            const forecastDays = res.forecast.forecastday;
            forecastDays.forEach(day => generateForecastCards(day));
            /* const forecastDate = new Date(res.forecast.forecastday[4].date);
            const foreTest = forecastDate.getDay();
            const dayNames = ['Sunday', 'Mondayy', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            console.log(dayNames[foreTest]); */
        })
        .catch(function(err){
            console.log(err);
        })
}

submitButton.addEventListener('click', submitForm);

