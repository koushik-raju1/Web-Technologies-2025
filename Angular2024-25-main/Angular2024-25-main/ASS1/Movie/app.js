var app = angular.module('movieRentalApp', []);

app.service('RentalService', function() {
    this.calculatePrice = function(year) {
        var currentYear = new Date().getFullYear();
        
        if (currentYear - year <= 3) {
            return 5; 
        } else {
            return 3; 
        }
    };
});

app.controller('MovieController', function($scope, RentalService) {
   
    $scope.movies = [
        { title: 'Inception', genre: 'Sci-Fi', year: 2010 },
        { title: 'Parasite', genre: 'Drama', year: 2019 },
        { title: 'The Dark Knight', genre: 'Action', year: 2008 },
        { title: 'Avengers: Endgame', genre: 'Action', year: 2019 },
        { title: 'Interstellar', genre: 'Sci-Fi', year: 2014 }
    ];

    $scope.genres = ['Sci-Fi', 'Drama', 'Action'];
    $scope.years = [2008, 2010, 2014, 2019];
    $scope.selectedGenre = '';
    $scope.selectedYear = '';
    $scope.newMovie = { title: '', genre: '', year: '' };
    $scope.error = '';

    $scope.getRentalPrice = function(year) {
        return RentalService.calculatePrice(year);
    };

    $scope.filteredMovies = function() {
        return $scope.movies.filter(function(movie) {
            
            var genreMatch = !$scope.selectedGenre || movie.genre === $scope.selectedGenre;
            
            var yearMatch = !$scope.selectedYear || movie.year === $scope.selectedYear;
            return genreMatch && yearMatch;
        });
    };

    $scope.addMovie = function() {
        
        var isDuplicate = $scope.movies.some(function(movie) {
            return movie.title.toLowerCase() === $scope.newMovie.title.toLowerCase();
        });

        if (isDuplicate) {
            $scope.error = 'Movie title must be unique.';
        } else if ($scope.newMovie.title && $scope.newMovie.genre && $scope.newMovie.year) {
       
            $scope.movies.push({
                title: $scope.newMovie.title,
                genre: $scope.newMovie.genre,
                year: $scope.newMovie.year
            });
            
            $scope.newMovie = { title: '', genre: '', year: '' };
            $scope.error = ''; 
        } else {
            $scope.error = 'Please fill in all fields.';
        }
    };
});
