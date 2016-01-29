'use strict';

/**
 * @ngdoc function
 * @name customerpageApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the customerpageApp
 */
var app = angular.module('customerpageApp');
  
  app.controller('MainCtrl', function ($scope,$http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	$scope.names={};
	$http.get('/customers/')
        .success(function (data) {
			console.log(data);
			console.log(data.records);
            $scope.names = data;
        });
  });
