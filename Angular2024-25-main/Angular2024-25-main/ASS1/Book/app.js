var app = angular.module('libraryApp', []);

app.service('libraryService', function() {
    var library = [
        { category: 'Fiction', count: 120 },
        { category: 'Non-Fiction', count: 80 },
        { category: 'Science', count: 150 },
        { category: 'Mathematics', count: 70 }
    ];

    this.getLibrary = function() {
        return library;
    };

    this.addCategory = function(newCategory) {
        library.push(newCategory);
    };
});

app.controller('LibraryController', function($scope, libraryService) {
    $scope.library = libraryService.getLibrary();
    $scope.newCategory = { name: '', count: 0 };
    $scope.categoryError = '';

    $scope.addCategory = function() {
        var isDuplicate = $scope.library.some(function(item) {
            return item.category.toLowerCase() === $scope.newCategory.name.toLowerCase();
        });

        if (isDuplicate) {
            $scope.categoryError = 'Category name must be unique.';
        } else {
            $scope.categoryError = '';
            var newCategory = {
                category: $scope.newCategory.name,
                count: $scope.newCategory.count
            };
            libraryService.addCategory(newCategory);
            $scope.newCategory.name = '';
            $scope.newCategory.count = 0;
        }
    };
});
