'use strict';
var customerPageFilterApp =angular.module('customerPageFilters',[]);



customerPageFilterApp.filter('paginator', function(PaginationService)
{
    return function(input, currentpage,maxitemsperpage)

    {   console.log('**********starting point on click*******');
        var startSlicingAt =0;
        var totalPages = Math.ceil(input.length/12);
        PaginationService.lastStateOfCurrentPage = PaginationService.currentPage;

        if(currentpage !==0 && currentpage < totalPages){
            startSlicingAt =currentpage * maxitemsperpage ;
        }
        console.log('inside paginator');
        console.log(angular.element('#filter').scope());
        console.log(angular.element('#filter').val());

        //Set visible customers and itemsCount when zero results are returned
        if(input.length===0){
            console.log('inside input 0');
          //  PaginationService.currentPage=0;
            PaginationService.itemsCount=0;
            PaginationService.visibleCustomers=0;
            return input;
        }
        PaginationService.itemsCount=input.length;
        PaginationService.totalPages = totalPages;
        PaginationService.visibleCustomers = PaginationService.noOfCustomers();
        console.log(PaginationService.currentPage + ' '+  PaginationService.itemsCount);
        console.log(input);
        if(angular.element('#filter').scope()!== 'undefined' ){
            if(angular.element('#filter').val()){
                //showing first page
                console.log('currentpage' + currentpage + 'totalPages' + totalPages);
                var currentIndex = currentpage +1;
                if(currentIndex > totalPages) {
                    var adjustmentIndex = (currentpage - totalPages) +1;
                    console.log('adjustmentIndex' + adjustmentIndex);
                    console.log('The current page is:' + PaginationService.currentPage);
                    for(var i=0;i<adjustmentIndex;i++){
                        PaginationService.currentPage--;
                    }
                    PaginationService.adjustmentIndex = adjustmentIndex;
                }

                else{
                    PaginationService.visibleCustomers = PaginationService.noOfCustomers();
                }


                PaginationService.lastStateOfCurrentPage = PaginationService.currentPage;
                console.log('the last page is');
                console.log(PaginationService.lastStateOfCurrentPage);
            }
        }


        var sliced = input.slice(startSlicingAt);
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
