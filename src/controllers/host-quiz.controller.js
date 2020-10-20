angular.module('app').controller('HostQuizController', ['$scope', '$routeParams', '$route', '$location', 'HostService', function ($scope, $routeParams, $route, $location, HostService) {

    const roomCode = $routeParams.roomCode;

    $scope.joinUrl = `${location.protocol}://${location.host}`;

    async function refresh() {
        try {
            $scope.state = await HostService.getState(roomCode);
        } catch (error) {
            $scope.error = error.message;
        } finally {
            $scope.$applyAsync();
        }
    }

    $scope.abort = async function() {
        try {
            await HostService.deleteRoom(roomCode);
            $location.path('/host').replace();
        } catch (error) {
            $scope.error = error.message;
        } finally {
            $scope.$applyAsync();
        }
    }

    $scope.next = async function() {
        try {
            $scope.state = await HostService.nextStep(roomCode);
            if ($scope.state == undefined) {
                // We've finished the quiz, so go back to quiz list
                $location.path('/host').replace();
                $route.reload();
            }
            delete $scope.error
        } catch (error) {
            $scope.error = error.message;
        } finally {
            $scope.$applyAsync();
        }
    }

    async function start() {
        await refresh();
    }

    start();

    setInterval(refresh, 1000);
}]);