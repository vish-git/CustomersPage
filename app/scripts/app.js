
'use strict';

/**
 * @ngdoc overview
 * @name customerpageApp
 * @description
 * # customerpageApp
 *
 * Main module of the application.
 */
var customerPage = angular.module('customerpageApp', ['ngRoute','customerServices','customerPageFilters']);
customerPage.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/cardView.html',
                controller: 'cardVieController'
            }).
            when('/listView', {
                templateUrl: 'views/listView.html',
                controller    :'cardVieController'

            }).
            when('/addCustomer', {
                templateUrl: 'views/addCustomer.html',
                controller: 'addCustomController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

customerPage.controller('cardVieController',function($scope,$http,PaginationService){
    $scope.names=[];
    $http.get('/customers/')
        .success(function (data) {
           $scope.names = data.records;
        });
    $scope.pageParameters = PaginationService;
    $scope.delete = function(index){
        console.log('inside after delete');
        $scope.names.splice( $scope.names.indexOf(index),1);
        if($scope.names.length%12===0) {
            if(PaginationService.isLastPage()) {
                $scope.pageParameters.currentPage--;
            }
            $scope.pageParameters.totalPages--;

        }


    };
});



