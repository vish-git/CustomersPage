(function () {'use strict';

    describe('customerpageApp Services Test', function () {
        //mock object
        var customers = {
            'records': [
                {
                    'Name': 'Word Bell',
                    'Location': 'Dellas,Texas',
                    'orders': 1,
                    'image' :'/images/User.jpg'
                },
                {
                    "Name": "Candy sharon",
                    "Location": "Dellas,Texas",
                    "orders": 9,
                    "image" :"/images/User.jpg"
                }]};

        //local variables
        var $httpBackend;
        var $http;
        var service;
        var masterDataService;
        var scope;
        var cardViewCtrlScope;
        var cardViewCtrl;
        var paginationService;
        //setup
        beforeEach(module('customerpageApp'));
        //angular - mocks creation
        beforeEach(inject(function ($rootScope,GetJSONDataService,MasterData,_$http_, _$httpBackend_,$controller,PaginationService) {
            service = GetJSONDataService;
            masterDataService = MasterData;
            paginationService = PaginationService;
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            scope = $rootScope;
            cardViewCtrlScope = $rootScope.$new();
            cardViewCtrl = $controller('cardVieController', {
                $scope: cardViewCtrlScope

            });

        }));
        beforeEach(function () {
            $httpBackend.
                whenGET('/customers/').
                respond(function () { return [200, customers]; });
            $httpBackend.whenGET('views/cardView.html')
                .respond(200);
        });
        //tearDown
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        xit('Check  whether the mock is set properly', function () {
            var data;

            $http.
                get('/customers/').
                then(function (response) { data = response.data;
                  });
            $httpBackend.flush();


            expect(data).toEqual(customers);
        });

        it('testing GetJSONDataService',function(){
            service.getCustomerRecords(function(data){
                var customerData = data.records;
                masterDataService.layoutData = customerData;
                expect(customerData[0].Name).toBe('Word Bell');
            });
            $httpBackend.flush();
        });

        it('testing MasterDataService',function(){
            service.getCustomerRecords(function(data){
                var customerData = data.records;
                masterDataService.layoutData = customerData;
                expect(masterDataService.layoutData[0].Name).toBe('Word Bell');
            });
            $httpBackend.flush();

            expect(masterDataService.layoutData[0].Name).toBe('Word Bell');


        });

        it('testing Pagination Service',function(){
            service.getCustomerRecords(function(data){
                var customerData = data.records;
                masterDataService.layoutData = customerData;
                console.log(paginationService);
               // expect(customerData[0].Name).toBe('Word Bell');
            });
            $httpBackend.flush();

           // expect(masterDataService.cardLayoutData[0].Name).toBe('Word Bell');


        });



        it('testing cardViewController initialization',function(){

            service.getCustomerRecords(function(data){
                var customerData = data.records;
                masterDataService.layoutData = customerData;
                expect(cardViewCtrlScope.names.length).toBe(masterDataService.layoutData.length);

            });




            $httpBackend.flush();



        });


        it('testing rootscope initial values',function(){

           expect(scope.show).toBe(true);
            $httpBackend.flush();
        });

        it('testing delete function fo cardView Controller',function(){
            service.getCustomerRecords(function(data){
                var customerData = data.records;
                masterDataService.layoutData = customerData;
                cardViewCtrlScope.delete(0);
                expect(masterDataService.layoutData.length).toBe(1);
              //  expect(cardViewCtrlScope.names.length).toBe(masterDataService.cardLayoutData.length);

            });

            $httpBackend.flush();
        });

        it('testing carViewController page parmaters after add operation',function(){
            masterDataService.operation ='ADD';
            expect(cardViewCtrlScope.pageParameters.currentPage).toBe(0);
            expect(masterDataService.operation==='');

            $httpBackend.flush();
        });












    });

}());
