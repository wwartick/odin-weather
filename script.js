const submitButton = document.querySelector('#submit-button')

const submitForm = function() {
    const userInput = document.querySelector('#location-input');
    let userLocation = userInput.value;
    searchWeather(userLocation);

}

const searchWeather = function(location) {

    fetch(`http://api.weatherapi.com/v1/forecast.json?key=868a48d93ab64879b79235103242103&q=${location}&days=6&aqi=no&alerts=no`, {mode: 'cors'})
        .then(function(res){
            return res.json();
        }).then(function(res){
            console.log(res);
            console.log((res.forecast.forecastday[4].date).substring(5));
            const forecastDate = new Date(res.forecast.forecastday[4].date);
            const foreTest = forecastDate.getDay();
            const dayNames = ['Sunday', 'Mondayy', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            const shortNames = dayName.split(0,3)''
            console.log(dayNames[foreTest]);
        })
        .catch(function(err){
            console.log(err);
        })
}

submitButton.addEventListener('click', submitForm);

