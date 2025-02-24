// app.js (Main AngularJS Module)
var app = angular.module('financeApp', ['ngRoute']);

// Configure routes
app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');  // Fix for routing issues

    $routeProvider
        .when('/dashboard', {
            templateUrl: 'dashboard.html',
            controller: 'DashboardController'
        })
        .when('/expenses', {
            templateUrl: 'expenses.html',
            controller: 'ExpensesController'
        })
        .when('/income', {
            templateUrl: 'income.html',
            controller: 'IncomeController'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
});


// Dashboard Controller
app.controller('DashboardController', function($scope) {
    $scope.totalIncome = 0;
    $scope.totalExpenses = 0;
    $scope.balance = 0;

    var incomeRecords = JSON.parse(localStorage.getItem('incomeRecords')) || [];
    var expenseRecords = JSON.parse(localStorage.getItem('expenseRecords')) || [];

    $scope.totalIncome = incomeRecords.reduce((sum, record) => sum + record.amount, 0);
    $scope.totalExpenses = expenseRecords.reduce((sum, record) => sum + record.amount, 0);
    $scope.balance = $scope.totalIncome - $scope.totalExpenses;
});

// Expenses Controller
app.controller('ExpensesController', function($scope) {
    $scope.expenses = JSON.parse(localStorage.getItem('expenseRecords')) || [];
    $scope.newExpense = { description: '', amount: 0 };

    $scope.addExpense = function() {
        if ($scope.newExpense.description && $scope.newExpense.amount) {
            $scope.expenses.push({ ...$scope.newExpense, amount: parseFloat($scope.newExpense.amount) });
            localStorage.setItem('expenseRecords', JSON.stringify($scope.expenses));
            $scope.newExpense = { description: '', amount: 0 };
        }
    };
});

// Income Controller
app.controller('IncomeController', function($scope) {
    $scope.income = JSON.parse(localStorage.getItem('incomeRecords')) || [];
    $scope.newIncome = { description: '', amount: 0 };

    $scope.addIncome = function() {
        if ($scope.newIncome.description && $scope.newIncome.amount) {
            $scope.income.push({ ...$scope.newIncome, amount: parseFloat($scope.newIncome.amount) });
            localStorage.setItem('incomeRecords', JSON.stringify($scope.income));
            $scope.newIncome = { description: '', amount: 0 };
        }
    };
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
    nav {
        margin-bottom: 20px;
    }
    nav a {
        margin: 10px;
        text-decoration: none;
        color: #007bff;
        font-weight: bold;
    }
    nav a:hover {
        text-decoration: underline;
    }
    .container {
        max-width: 600px;
        margin: auto;
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    input, button {
        padding: 10px;
        margin: 5px;
        width: 90%;
    }
    button {
        background-color: #28a745;
        color: white;
        border: none;
        cursor: pointer;
    }
    button:hover {
        background-color: #218838;
    }
    .summary {
        font-size: 1.2em;
        font-weight: bold;
    }
`;
document.head.appendChild(style);
