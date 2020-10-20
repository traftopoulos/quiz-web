angular.module('app').controller('PlayQuizController', ['$scope', '$routeParams', '$location', 'PlayService', function ($scope, $routeParams, $location, PlayService) {

    const roomCode = $routeParams.roomCode;
    const playerName = $routeParams.playerName;

    $scope.selectAnswer = async function(letter) {
        try {
            $scope.state = await PlayService.submitAnswer(roomCode, playerName, letter);
        } catch (error) {
            $scope.error = error.message;
        } finally {
            $scope.$applyAsync();
        }
    }

    $scope.playAnotherQuiz = function() {
        $location.path('/play').replace();
    }

    async function refresh() {
        try {
            $scope.state = await PlayService.getState(roomCode, playerName);
            delete $scope.error
        } catch (error) {
            $scope.error = error.message;
            if (error.message.includes('not found')) {
                $scope.state = { isGameOver: true };
            }
        } finally {
            if ($scope.state.isGameOver) {
                clearInterval(timer);
            }
            $scope.$applyAsync();
        }
    }

    async function start() {
        await refresh();
    }

    start();

    const timer = setInterval(refresh, 1000);
}]);