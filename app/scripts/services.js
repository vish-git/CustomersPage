'use strict';
var customerService = angular.module('customerServices',[]);

customerService.service('PaginationService',function(){

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
            console.log('currentpage' + this.currentPage);
            return ((this.currentPage*this.maxItemsPerPage)+this.itemsCount%this.maxItemsPerPage);
        }
        return (this.currentPage+1)*this.maxItemsPerPage;

    };

    this.nextPage = function () {
        console.log('currentpage' + this.currentPage);
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

