
(function () {'use strict';

    describe('edit customer controller Test', function () {
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
                    'Name': 'Candy sharon',
                    'Location': 'Dellas,Texas',
                    'orders': 9,
                    'image' :'/images/User.jpg'
                }]};

        //local variables
        var $httpBackend;
        var $http;
        var service;
        var masterDataService;
        var scope;
        var editCustomerCtrlScope;
        var editCustomerCtrl;
        var editCustomerDataService;
        //setup
        beforeEach(module('customerpageApp'));
        //angular - mocks creation
        beforeEach(inject(function ($rootScope,GetJSONDataService,MasterData,_$http_, _$httpBackend_,$controller,GetEditCustomerDataService) {
            service = GetJSONDataService;
            masterDataService = MasterData;
            editCustomerDataService = GetEditCustomerDataService;
            $http = _$http_;
            $httpBackend = _$httpBackend_;
            scope = $rootScope;
            editCustomerCtrlScope = $rootScope.$new();
            editCustomerCtrl = $controller('editCustomController', {
                $scope: editCustomerCtrlScope

            });

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

        xit('Check  whether the mock is set properly for edit customer controller tests', function () {
            var data;

            $http.
                get('/customers/').
                then(function (response) {
                    data = response.data;
                });
            $httpBackend.flush();
        });


        it('testing edit Customer Controller initialization',function(){

            expect(scope.show).toBe(false);

        });



        it('testing saveEdited Customer function of edit Controller',function(){
            editCustomerDataService.EditCustomerIndex = 0;
            editCustomerDataService.EditCustomerData = {
                'Name': 'Rajkumar',
                'Location': 'Dellas,Texas',
                'orders': 1,
                'image': '/images/User.jpg'
            };
            service.getCustomerRecords(function(data){

                var customerData = data.records;
                masterDataService.layoutData = customerData;

                editCustomerCtrlScope.SaveEditedCustomer();
                expect(masterDataService.layoutData[0].Name).toBe('Rajkumar');

            });

            $httpBackend.flush();
        });










    });

}());
