
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

customerPage.controller('cardVieController',function($scope,$rootScope,$http,PaginationService,GetJSONDataService,MasterData,GetEditCustomerDataService){
    $scope.names=[];
    $scope.pageParameters = PaginationService;
    $rootScope.show = true;

    $scope.$on('$locationChangeStart',function(e,next,previous){
        MasterData.previousUrl = previous.split('#')[1];

    });


   GetJSONDataService.getCustomerRecords(function(data){

       if(!MasterData.operationPerformed){
           MasterData.layoutData = data.records;
       }

       if(MasterData.operation ==='ADD' ){
           $scope.pageParameters.currentPage = 0;
           MasterData.operation='';
       }

       $scope.names = MasterData.layoutData;

    });

    $rootScope.filterChanged = function(){

        console.log('changed');
        if($rootScope.filterName !== 'undefined') {
            console.log('*#########################################');
            if(!$rootScope.filterName.Name){
                var adjustmentIndex =  PaginationService.adjustmentIndex;
                console.log('adjustmentIndex' + adjustmentIndex);
                console.log('The current page is:' + PaginationService.currentPage);
                for(var i=0;i<adjustmentIndex;i++){
                    PaginationService.currentPage++;
                }
                PaginationService.adjustmentIndex = 0;
            }

        }
    };

    $scope.delete = function(index){
        MasterData.layoutData.splice(index,1);
        if($scope.names.length%12===0) {
            if (PaginationService.isLastPage()) {
                $scope.pageParameters.currentPage--;
            }
            $scope.pageParameters.totalPages--;
        }
        MasterData.operationPerformed =true;
      };

    $scope.doEdit =function(index){
        console.log(index);
        GetEditCustomerDataService.Page= $scope.pageParameters.currentPage;
        GetEditCustomerDataService.EditCustomerIndex=index + (12*GetEditCustomerDataService.Page);
        GetEditCustomerDataService.EditCustomerData = $scope.names[GetEditCustomerDataService.EditCustomerIndex];
        GetEditCustomerDataService.testData();
    };
});

customerPage.controller('addCustomController',function($scope,$rootScope,MasterData,$location) {
    $rootScope.show = false;
    $scope.addCustomer = function(){
        MasterData.layoutData.splice(0,0,$scope.customer);
        MasterData.operation='ADD';
        MasterData.operationPerformed =true;
        $location.path(MasterData.previousUrl);
        };
    $scope.cancel = function(){
        $location.path(MasterData.previousUrl);
    };

});
/*customerPage.controller('editCustomController',function($scope,customerDataForEdit,customerDataIndex) {

    $scope.editCustomer = customerDataForEdit;
    $scope.editIndex = customerDataIndex;
    console.log('inside edit controller');

});*/

customerPage.controller('editCustomController',function($scope,$rootScope,GetEditCustomerDataService,MasterData,$location) {
    $rootScope.show = false;
    $scope.editCustomer = GetEditCustomerDataService.EditCustomerData;
    $scope.editIndex = GetEditCustomerDataService.EditCustomerIndex;

    $scope.SaveEditedCustomer =function(){
        MasterData.layoutData[GetEditCustomerDataService.EditCustomerIndex] = GetEditCustomerDataService.EditCustomerData;
        MasterData.operation='EDIT';
        MasterData.operationPerformed =true;
        $location.path(MasterData.previousUrl);
    };
    $scope.cancel = function(){
        $location.path(MasterData.previousUrl);


    };

    console.log('inside edit controller');

});



