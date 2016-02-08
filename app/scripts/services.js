'use strict';
var customerService = angular.module('customerServices',[]);

customerService.service('PaginationService',function(){

    this.currentPage=0;
    this.maxItemsPerPage=12;
    this.itemsCount = 0;
    this.totalPages =0;
    this.pageStart=0;
    this.visibleCustomers = 0 ;
    this.adjustmentIndex = 0;


    this.isEmpty = function(){
        return false;
    };

    this.noOfCustomers = function(){
        //last page
        if(this.isLastPage()){
            if(this.itemsCount%this.maxItemsPerPage===0){
                this.visibleCustomers = ((this.currentPage+1)*this.maxItemsPerPage)+this.itemsCount%this.maxItemsPerPage;
                return this.visibleCustomers;
            }

            else
            {
                this.visibleCustomers = (this.currentPage * this.maxItemsPerPage) + this.itemsCount % this.maxItemsPerPage;
                return this.visibleCustomers;
            }
        }
        this.visibleCustomers =(this.currentPage+1)*this.maxItemsPerPage;
        return this.visibleCustomers;

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

customerService.service('MasterData',function(){
    var self = this;
    self.cardLayoutData = [];
    self.cardLayouIndexForEdit =[];
    self.operation = '';
    self.deletedIndexes = [];
    self.previousUrl='';
    self.layoutData = [];
    self.operationPerformed = false;
   });

customerService.service('GetJSONDataService',function($http){
    var self=this;
    self.customer = [];

    self.getCustomerRecords = function(callback){
       $http.get('/customers/')
            .success(callback);
    };
});

customerService.service('GetEditCustomerDataService',function(){
    var self=this;
    self.EditCustomerData = {};
    self.EditCustomerIndex = 0;
    self.Page=0;

    self.testData = function(){
      console.log(self.EditCustomerData);
        console.log(self.EditCustomerIndex);

    };


});


