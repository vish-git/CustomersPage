
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
   /* if(angular.element('#filter').scope()!== 'undefined' ){
        if(angular.element('#filter').val()){
            console.log(angular.element('#filter').scope());
            console.log('****************************************');
            if($scope.pageParameters.currentPage > $scope.pageParameters.totalPages ) {
                var returnPreviousIndexcount = $scope.pageParameters.currentPage - $scope.pageParameters.totalPages;
                console.log('the index to adjust is:' + returnPreviousIndexcount);
            }
        }
    }*/

   GetJSONDataService.getCustomerRecords(function(data){
        $scope.names=data.records;

       if(MasterData.cardLayoutData.length !== 0 && MasterData.operation ==='ADD' ){
				MasterData.cardLayoutData.forEach(function(element){
                $scope.names.splice(0,0,element);

            });
            //move to first page
             $scope.pageParameters.currentPage = 0;
		}
       if(MasterData.cardLayoutData.length !== 0 && MasterData.operation ==='EDIT' ){
        console.log(MasterData.cardLayoutData);
           MasterData.cardLayoutData.forEach(function(element){
                 $scope.names[element[0]]=element[1];
           });


       }
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

        console.log( GetEditCustomerDataService.EditCustomerIndex);

        GetEditCustomerDataService.testData();
    };
});

customerPage.controller('addCustomController',function($scope,MasterData,$location) {

    $scope.addCustomer = function(){
        MasterData.cardLayoutData.push($scope.customer);
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
        var editedcustomerData = [$scope.editIndex,$scope.editCustomer];
        console.log('editcustomerdata:');
        console.log(editedcustomerData);
        MasterData.cardLayoutData.push(editedcustomerData);
        console.log(MasterData.cardLayoutData);
        MasterData.operation='EDIT';
        $location.url('/');
    };
    $scope.cancel = function(){
        $location.url('/');

    };

    console.log('inside edit controller');

});



