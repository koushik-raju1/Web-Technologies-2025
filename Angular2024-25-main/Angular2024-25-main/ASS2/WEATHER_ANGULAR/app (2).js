// app.js (Main AngularJS Module)
var app = angular.module('weatherApp', ['ngRoute']);

// Configure routes
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'WeatherController'
        })
        .when('/favorites', {
            templateUrl: 'favorites.html',
            controller: 'FavoritesController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

// Service to fetch weather data
app.service('WeatherService', function($http) {
    var API_KEY = 'a6039d6d2b4683c557209b24b517a088';
    var baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';

    this.getWeather = function(city) {
        return $http.get(baseURL + city + '&appid=' + API_KEY + '&units=metric');
    };
});

// Weather Controller
app.controller('WeatherController', function($scope, WeatherService) {
    $scope.city = '';
    $scope.weatherData = null;
    $scope.error = '';
    $scope.favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    $scope.getWeather = function() {
        if (!$scope.city) return;

        WeatherService.getWeather($scope.city)
            .then(function(response) {
                $scope.weatherData = response.data;
                $scope.error = '';
            })
            .catch(function(error) {
                $scope.error = 'City not found. Try again!';
                $scope.weatherData = null;
            });
    };

    $scope.addFavorite = function() {
        if ($scope.weatherData && !$scope.favorites.includes($scope.weatherData.name)) {
            $scope.favorites.push($scope.weatherData.name);
            $scope.favorites.sort(); // Sort alphabetically
            localStorage.setItem('favorites', JSON.stringify($scope.favorites));
        }
    };
});

// Favorites Controller
app.controller('FavoritesController', function($scope, WeatherService) {
    $scope.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    $scope.weatherDetails = {};
    
    $scope.loadWeather = function(city) {
        WeatherService.getWeather(city)
            .then(function(response) {
                $scope.weatherDetails[city] = response.data;
            });
    };

    $scope.favorites.forEach(city => $scope.loadWeather(city));
});

// CSS Styles
var style = document.createElement('style');
style.innerHTML = `
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 20px;
        text-align: center;
    }
    input {
        padding: 10px;
        width: 250px;
        margin: 10px;
    }
    button {
        padding: 10px 15px;
        background-color: #28a745;
        color: white;
        border: none;
        cursor: pointer;
    }
    button:hover {
        background-color: #218838;
    }
    .error {
        color: red;
    }
    .weather-box {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        display: inline-block;
        margin-top: 20px;
    }
    nav a {
        margin: 10px;
        text-decoration: none;
        color: #007bff;
    }
    nav a:hover {
        text-decoration: underline;
    }
`;
document.head.appendChild(style);
