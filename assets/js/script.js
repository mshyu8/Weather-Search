var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city-name');
var citySelect = '';
var currentWeatherEl = document.querySelector('#current-weather');
var apiKey = '8679a676cb3c042ac971200d58f59836'; 
var searchBtn = document.querySelector('#search-btn');
var recentSearchEl = document.querySelector('#recently-searched');


var today = dayjs();
$('#currentDay').text(today.format('MMMM D, YYYY'));


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
             recentSearch.push(newCity)
           };

           // Append to local storage
           localStorage.setItem('recentSearch', JSON.stringify(recentSearch));

           getForecast(latitude, longitude);
           getCurrent(latitude, longitude, displayCity);
       });

};

function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat=39.9612&lon=-82.9988&appid=8679a676cb3c042ac971200d58f59836'
    
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(city);
          
        })
    }
    
    function poo() {
    
        console.log(getLat);
    }

    








searchBtn.addEventListener("click", function (event) {
    var citySelect = cityInputEl.value;
    getCords(citySelect);
});

dayjs();