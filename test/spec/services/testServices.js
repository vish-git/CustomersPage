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
                }]};

        //local variables
        var $httpBackend;
        var $http;
        var service;
        var masterDataService;
        var scope;
        //setup
        beforeEach(module('customerpageApp'));
        //angular - mocks creation
        beforeEach(inject(function ($rootScope,GetJSONDataService,MasterData,_$http_, _$httpBackend_) {
            service = GetJSONDataService;
            masterDataService = MasterData;
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            scope = $rootScope;
        }));
        beforeEach(function () {
            $httpBackend.
                whenGET('/customers/').
                respond(function () { return [200, customers]; });
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
                masterDataService.cardLayoutData = customerData;
                expect(customerData[0].Name).toBe('Word Bell');
            });
            $httpBackend.flush();
        });

        it('testing MasterDataService',function(){
            service.getCustomerRecords(function(data){
                var customerData = data.records;
                masterDataService.cardLayoutData = customerData;
                expect(customerData[0].Name).toBe('Word Bell');
            });
            $httpBackend.flush();

            expect(masterDataService.cardLayoutData[0].Name).toBe('Word Bell');


        });

    });

}());
