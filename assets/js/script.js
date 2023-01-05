var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city-name');
var citySelect = '';
var currentWeatherEl = document.querySelector('#current-weather');
var apiKey = '8679a676cb3c042ac971200d58f59836'; 
var searchBtn = document.querySelector('#search-btn');
var recentSearchEl = document.querySelector('.recently-searched');
var currentTempEl = document.querySelector('#current-temp');
var currentWindEl = document.querySelector('#current-wind');
var currentHumidityEl = document.querySelector('#current-humidity');
var currentIconEl = document.querySelector('#current-icon');
//var forecast = document.querySelector('.weather-dis');
var displayCity = document.querySelector('#city-name');
var currentDay = document.querySelector('#current-day');
var forecastEl = document.querySelector('.forecast');

var today = dayjs();
$('#currentDay').text(today.format('MMMM D, YYYY'));


var recentSearch = JSON.parse(localStorage.getItem('recentSearch')) ?? [];;
  
  
  var displayrecentSearch = function() {
  var recentCities = recentSearchEl.getElementsByTagName('button');
  for (i=0; i<recentCities.length; i++){
    recentCities[i].setAttribute('style', 'display: none')
  }

  
  for (i=0; i<recentSearch.length; i++) {
    var cityButton = document.createElement('button')
    cityButton.textContent = recentSearch[i].city;
    cityButton.classList.add('col-xs-7', 'col-sm-6', 'col-lg-3', 'col-xl-2')
    cityButton.addEventListener('click', function(event) {
      getCords(this.textContent);
    });
    recentSearchEl.appendChild(cityButton);
  };
};

displayrecentSearch();



function getCurrent(latitude, longitude, cityName) {
    var requestUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey;
    
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (current) {
            console.log(current);

            var currentTemp = current.current.temp;
            var currentWind = current.current.weather.wind_speed;
            var currentHumidity = current.current.humidity;
            var currentIcon = current.current.weather[0].icon;
            
            currentTempEl.textContent = 'Temperature: ' + parseFloat(currentTemp) + '°F';
            currentWindEl.textContent = 'Wind Speed: ' + currentWind + ' mph';
            currentHumidityEl.textContent = 'Humidity: ' + currentHumidity + '%';
            currentIconEl.setAttribute('src', 'https://openweathermap.org/img/wn/'+ currentIcon + '.png')
            //forecast.setAttribute("style", "display: inline")
            displayCity.textContent = cityName;
            currentDay.textContent = today;
        });
        displayrecentSearch();
    };


    function getForecast(latitude, longitude) {
      var requestUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey;

      

        fetch(requestUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (forecast) {
            
            var dailyC = forecastEl.getElementsByTagName('*');     
            for (i=0; i<dailyC.length; i++){
            dailyC[i].setAttribute('style', 'display: none')
            }
            for (i=1; i<forecast.daily.length; i++){
              var maxTemp = forecast.daily[i].temp.max;
               var fullDateTime = dayjs(forecast.daily[i].dt).toDate();
               var displayDay = dayjs(fullDateTime).format('dddd');
               var displayDate = dayjs(fullDateTime).format('MMMM D,YYYY');
               var time = dayjs(fullDateTime).format('h:mmA')
              var dailyWeatherIcon = forecast.daily[i].weather[0].icon;
              var dailyWind = forecast.daily[i].wind_speed;
              var dailyHumidity = forecast.daily[i].humidity;

            //  if (time === '3:00PM') {
                var dailyCard = document.createElement('div');
                dailyCard.classList.add('card','m-2', 'daily-card', 'col-10', 'col-md-4', 'col-lg-2');
                forecastEl.appendChild(dailyCard)
                 var cardDay = document.createElement('h5');
                 cardDay.textContent = displayDay;
                 cardDay.classList.add('card-title')
                 dailyCard.appendChild(cardDay);
                 var cardDate = document.createElement('h5');
                cardDate.textContent = displayDate;
                cardDate.classList.add('card-title')
                dailyCard.appendChild(cardDate);
                var dailyIcon = document.createElement('img')
                dailyIcon.setAttribute('src', 'https://openweathermap.org/img/wn/'+ dailyWeatherIcon + '.png');
                dailyCard.appendChild(dailyIcon);
                // var dailyCondition = document.createElement('p')
                // dailyCondition.classList.add('cardText')
                // dailyCondition.textContent = weatherCondition;
                // dailyCard.appendChild(dailyCondition)
                var dailyHigh = document.createElement('p')
                dailyHigh.classList.add('cardText')
                dailyHigh.textContent = parseFloat(maxTemp) + '°F';
                dailyCard.appendChild(dailyHigh)
                var dailyHumidityEl = document.createElement('p')
                dailyHumidityEl.classList.add('cardText')
                dailyHumidityEl.textContent = 'Humidity: ' + dailyHumidity + '%';
                dailyCard.appendChild(dailyHumidityEl)
                var dailyWindEl = document.createElement('p')
                dailyWindEl.classList.add('cardText')
                dailyWindEl.textContent = 'Wind Speed: ' + dailyWind + ' mph';
                dailyCard.appendChild(dailyWindEl)

                console.log(dayjs(1672851600).format('dddd'));
         //      }
            };
          });
      };
            



function getCords(city) {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;

    fetch(requestUrl)
        .then(function (response)  {
            return response.json();
        })
        .then(function (data) {
           console.log(data);

           var latitude = data[0].lat;
           var longitude = data[0].lon;
           var cityName = data[0].name;

           var addCity = {
            city: cityName,
            lat: latitude,
            lon: longitude,
           };
          
          
            var index = recentSearch.findIndex(object => object.city === addCity.city)
            if (index === -1){
                recentSearch.push(addCity)
           };

           
             localStorage.setItem('recentSearch', JSON.stringify(recentSearch));

           getForecast(latitude, longitude);
           getCurrent(latitude, longitude, cityName);
       });

};

    





searchBtn.addEventListener("click", function (event) {
    var citySelect = cityInputEl.value;
    getCords(citySelect);
});

dayjs();