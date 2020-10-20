angular.module('app').
factory('QuizService', ['$http', 'ConfigService', function($http, ConfigService) {

    function handleError(error) {
        if (error?.status == -1) {
            throw new Error('Communications failure');
        } else if (error?.data?.error) {
            throw new Error(error.data.error);
        } else {
            throw new Error('Unknown error');
        }
    }

    var service = {};

    service.getAllQuizzes = async () => {
        const base = ConfigService.apiBase;
        const url = `${base}quiz`;
        try {
            const response = await $http.get(url);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

    return service;
}]);