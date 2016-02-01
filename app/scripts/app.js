
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
            when('/editCustomer', {
                templateUrl: 'views/EditCustomer.html',
                controller: 'editCustomController'
               /* resolve : {
                    customerDataForEdit: function (GetEditCustomerDataService) {
                        console.log(GetEditCustomerDataService.EditCustomerData);
                        return GetEditCustomerDataService.EditCustomerData;
                    },
                    customerDataIndex: function (GetEditCustomerDataService) {
                        return GetEditCustomerDataService.EditCustomerIndex;

                    }
             }*/
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

customerPage.controller('cardVieController',function($scope,$http,PaginationService,GetJSONDataService,MasterData,GetEditCustomerDataService){
    $scope.names=[];


   GetJSONDataService.getCustomerRecords(function(data){
        $scope.names=data.records;

       if(Object.keys(MasterData.cardLayoutData).length !== 0 && MasterData.operation ==='ADD' ){
           $scope.names.splice(0,0,MasterData.cardLayoutData);
       }
       if(Object.keys(MasterData.cardLayoutData).length !== 0 && MasterData.operation ==='EDIT' ){
           $scope.names[GetEditCustomerDataService.EditCustomerIndex]=MasterData.cardLayoutData;
       }
    });


    $scope.pageParameters = PaginationService;
    $scope.delete = function(index){
        $scope.names.splice( $scope.names.indexOf(index),1);
        if($scope.names.length%12===0) {
            if(PaginationService.isLastPage()) {
                $scope.pageParameters.currentPage--;
            }
            $scope.pageParameters.totalPages--;

        }


    };
    $scope.doEdit =function(index){
        console.log(index);
        GetEditCustomerDataService.Page= $scope.pageParameters.currentPage;
        GetEditCustomerDataService.EditCustomerIndex=index + (12*GetEditCustomerDataService.Page);
        GetEditCustomerDataService.EditCustomerData = $scope.names[GetEditCustomerDataService.EditCustomerIndex];
        console.log(index);
        console.log( GetEditCustomerDataService.EditCustomerIndex);

        GetEditCustomerDataService.testData();
    };
});

customerPage.controller('addCustomController',function($scope,MasterData,$location) {

    $scope.addCustomer = function(){
        MasterData.cardLayoutData= $scope.customer;
        MasterData.operation='ADD';
        $location.url('/');
        };
    $scope.cancel = function(){
        $location.url('/');
    };

});
/*customerPage.controller('editCustomController',function($scope,customerDataForEdit,customerDataIndex) {

    $scope.editCustomer = customerDataForEdit;
    $scope.editIndex = customerDataIndex;
    console.log('inside edit controller');

});*/

customerPage.controller('editCustomController',function($scope,GetEditCustomerDataService,MasterData,$location) {

    $scope.editCustomer = GetEditCustomerDataService.EditCustomerData;
    $scope.editIndex = GetEditCustomerDataService.EditCustomerIndex;

    $scope.SaveEditedCustomer =function(){
        MasterData.cardLayoutData= $scope.editCustomer;
        MasterData.operation='EDIT';
        $location.url('/');
    };
    $scope.cancel = function(){
        $location.url('/');

    };

    console.log('inside edit controller');

});



