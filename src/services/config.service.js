angular.module('app').factory('ConfigService', [function() {

    var service = {};

    service.apiBase = 'http://localhost:8001/';

    return service;
}]);