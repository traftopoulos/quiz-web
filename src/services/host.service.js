angular.module('app').
factory('HostService', ['$http', 'ConfigService', function($http, ConfigService) {

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

    service.hostQuiz = async function(quizId) {
        const base = ConfigService.apiBase;
        const url = `${base}host/${encodeURIComponent(quizId)}`;
        try {
            const response = await $http.post(url);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

    service.deleteRoom = async function(roomCode) {
        const base = ConfigService.apiBase;
        const url = `${base}room/${encodeURIComponent(roomCode)}`;
        try {
            const response = await $http.delete(url);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

    service.getState = async function(roomCode) {
        const base = ConfigService.apiBase;
        const url = `${base}state/${encodeURIComponent(roomCode)}`;
        try {
            const response = await $http.get(url);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

    service.nextStep = async function(roomCode) {
        const base = ConfigService.apiBase;
        const url = `${base}next/${encodeURIComponent(roomCode)}`;
        try {
            const response = await $http.post(url);
            if (response.status == 204) {
                // Finished quiz, so room deleted
                return undefined;
            }
            return response.data;
        } catch (error) {
            handleError(error);
        }
    }

    return service;
}]);