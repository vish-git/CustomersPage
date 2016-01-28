'use strict';

/**
 * @ngdoc function
 * @name customerpageApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the customerpageApp
 */
angular.module('customerpageApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
