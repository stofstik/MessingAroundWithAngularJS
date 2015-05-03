// create our Angular module
var stofstikApp = angular.module('stofstik-app', ['ngRoute', 'ngAnimate']);

// define the route
stofstikApp.config(function ($routeProvider) {
    $routeProvider
        .when('/clicker', {
            controller: 'ClickController',
            templateUrl: 'partials/clicker.html'
        })
        .when('/someView', {
            controller: 'ClickController',
            templateUrl: 'partials/someView.html'
        }).otherwise({
            redirectTo: '/'
        });

});

// add a controller for the click app
stofstikApp.controller('ClickController', ['$scope', function ($scope) {

    $scope.totalClicks = 0;
    $scope.persons = [];

    $scope.incClicks = function () {
        // increment total clicks
        $scope.totalClicks += 1;

        // return if name field is empty
        if ($scope.inputName === "" || $scope.inputName === undefined) {
            return;
        }

        // create a new person and set it's clicks to 1
        var person = {
            name: $scope.inputName,
            clicks: 1,
            increment: function () {
                this.clicks += 1;
            }
        };

        // if the name alreay exists increment persons clicks!
        if ($scope.personExists(person.name) > -1) {
            var index = $scope.personExists(person.name);
            $scope.persons[index].increment();
        } else {
            // else add a person to the array
            $scope.persons.push(person);
        }
    };

    // a simple function using Angulars .equals() function 
    $scope.personExists = function (personName) {
        for (var i = 0; i < $scope.persons.length; i++) {
            if (angular.equals($scope.persons[i].name, personName)) {
                return i;
            }
        }
        return -1;
    };
}]);