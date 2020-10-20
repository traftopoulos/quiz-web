angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.when('/host', {
        templateUrl: 'views/quiz-list.view.html',
        controller: 'QuizListController'
    });

    $routeProvider.when('/host/:roomCode', {
        templateUrl: 'views/host-quiz.view.html',
        controller: 'HostQuizController'
    });

    $routeProvider.when('/play', {
        templateUrl: 'views/join-quiz.view.html',
        controller: 'JoinQuizController'
    });

    $routeProvider.when('/', {
        templateUrl: 'views/join-quiz.view.html',
        controller: 'JoinQuizController'
    });

    $routeProvider.when('/play/:roomCode/:playerName', {
        templateUrl: 'views/play-quiz.view.html',
        controller: 'PlayQuizController'
    });

    $routeProvider.otherwise({
        templateUrl: 'views/not-found.view.html'
    })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
    });
}]);