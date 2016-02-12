
(function () {'use strict';

    describe('add customer controller Test', function () {
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
        var addCustomerCtrlScope;
        var addCustomerCtrl;
        var location;
        //setup
        beforeEach(module('customerpageApp'));
        //angular - mocks creation
        beforeEach(inject(function ($rootScope,GetJSONDataService,MasterData,_$http_, _$httpBackend_,$controller,$location) {
            service = GetJSONDataService;
            masterDataService = MasterData;
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            location = $location;
            scope = $rootScope;
            addCustomerCtrlScope = $rootScope.$new();
            addCustomerCtrl = $controller('addCustomController', {
                $scope: addCustomerCtrlScope

            });

        }));
        beforeEach(function () {
            $httpBackend.
                whenGET('/customers/').
                respond(function () { return [200, customers]; });
            $httpBackend.when('GET', 'views/cardView.html').respond(200);
            $httpBackend.when('GET', 'views/listView.html').respond(200);
            $httpBackend.when('GET', 'views/addCustomer.html').respond(200);
            $httpBackend.when('GET', 'views/EditCustomer.html').respond(200);

        });
        //tearDown
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        xit('Check  whether the mock is set properly for add customer controller tests', function () {
            var data;

            $http.
                get('/customers/').
                then(function (response) {
                    data = response.data;
                });
            $httpBackend.flush();
        });


           it('testing addCustomer Controller initialization',function(){

            expect(scope.show).toBe(false);





           // $httpBackend.flush();



        });



        it('testing add function for addCustomer Controller',function(){
            addCustomerCtrlScope.customer = {
                'Name': 'Word Bell',
                'Location': 'Dellas,Texas',
                'orders': 1,
                'image': '/images/User.jpg'
            };
            service.getCustomerRecords(function(data){

                    var customerData = data.records;
                masterDataService.layoutData = customerData;

                addCustomerCtrlScope.addCustomer();

                expect(masterDataService.layoutData.length).toBe(3);

            });

            $httpBackend.flush();
        });



    });

}());
