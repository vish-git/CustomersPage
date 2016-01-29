
'use strict';

/**
 * @ngdoc overview
 * @name customerpageApp
 * @description
 * # customerpageApp
 *
 * Main module of the application.
 */
var customerPage = angular.module('customerpageApp', ['ngRoute']);
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




    };
});

customerPage.filter('paginator', function(PaginationService)
{
    return function(input, start)

    {
        console.log('the input is'+input.length);
        if(input.length===0){
           PaginationService.itemsEmpty=true;
            return input;
        }
        PaginationService.itemsCount=input.length;
        PaginationService.totalPages = Math.ceil(input.length/12);
        console.log(start);
        console.log(input);
        var sliced = input.slice(start);
        console.log(sliced);
        return sliced;


    };
});

customerPage.filter('linkGenerator',function(){
    return function(input,start,end){
        input = new Array(end - start);
        for (var i = 0; start < end; start++, i++) {
            input[i] = start;
        }

        return input;
    };

});

customerPage.service('PaginationService',function(){

   this.currentPage=0;
   this.maxItemsPerPage=12;
   this.itemsCount = 0;
    this.totalPages =0;
    this.pageStart=0;
	

    this.isEmpty = function(){
        return false;
    };

    this.noOfCustomers = function(){
        if(this.isLastPage()){
			console.log("currentpage" + this.currentPage);
            return ((this.currentPage*this.maxItemsPerPage)+this.itemsCount%this.maxItemsPerPage)
        }
        return (this.currentPage+1)*this.maxItemsPerPage

    };

    this.nextPage = function () {
        if (this.currentPage === this.totalPages-1) {
            return;
        }

        this.currentPage++;
    };

    this.perviousPage = function () {
        if (this.isFirstPage()) {
            return;
        }

        this.currentPage--;
    };

    this.lastPage = function () {
        console.log('total pages:'+this.totalPages);
        this.currentPage = this.totalPages-1;

    };

    this.isFirstPage = function () {
        return this.currentPage === 0;
    };

    this.firstPage = function(){
        this.currentPage = 0;
    };

    this.isLastPage =function(){
        return this.currentPage === this.totalPages-1;
    };







    //set Pagination disable if there is a singlepage

 //no of pages calculation

 //create page li elements dynamically

 //handle prvious page

 //handle next page

 //handle first Page

 //handle Last Page

 //handle active page

});