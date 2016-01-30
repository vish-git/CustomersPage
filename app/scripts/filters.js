'use strict';
var customerPageFilterApp =angular.module('customerPageFilters',[]);



customerPageFilterApp.filter('paginator', function(PaginationService)
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
        PaginationService.visibleCustomers = PaginationService.noOfCustomers();

        console.log(start);
        console.log(input);
        var sliced = input.slice(start);
        console.log(sliced);
        return sliced;


    };
});

customerPageFilterApp.filter('linkGenerator',function(){
    return function(input,start,end){
        input = new Array(end - start);
        for (var i = 0; start < end; start++, i++) {
            input[i] = start;
        }

        return input;
    };

});