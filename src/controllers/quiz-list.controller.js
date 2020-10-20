angular.module('app').controller('QuizListController', ['$scope', '$location', '$route', 'QuizService', 'HostService', function ($scope, $location, $route, QuizService, HostService) {

    $scope.refreshList = async function() {
        try {
            $scope.error = undefined;
            $scope.isLoading = true;
            $scope.quizList = await QuizService.getAllQuizzes();
            delete $scope.error
        } catch (error) {
            $scope.error = error.message;
        } finally {
            $scope.isLoading = false;
            $scope.$applyAsync();
        }
    };

    $scope.hostQuiz = async function(quiz) {
        try {
            const response = await HostService.hostQuiz(quiz.id);
            const roomCode = response.roomCode;
            $location.path(`/host/${roomCode}`).replace();
        } catch (error) {
            $scope.error = error.message;
        } finally {
            $scope.$applyAsync();
        }
    };

    async function start() {
        await $scope.refreshList();
    }

    start();
}]);