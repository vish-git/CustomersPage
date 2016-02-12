describe('Testing Routes', function () {

    var $httpBackend;

// load the controller's module
    beforeEach(module('customerpageApp'));
    beforeEach(inject(function (_$httpBackend_) {


        $httpBackend = _$httpBackend_;
    }));
    beforeEach(function () {
        $httpBackend.when('GET', 'views/cardView.html').respond(200);
        $httpBackend.when('GET', 'views/listView.html').respond(200);
        $httpBackend.when('GET', 'views/addCustomer.html').respond(200);
        $httpBackend.when('GET', 'views/EditCustomer.html').respond(200);

    });

    it('should test routes',
        inject(function ($route) {

            expect($route.routes['/'].controller).toBe('cardVieController');
            expect($route.routes['/'].templateUrl).toEqual('views/cardView.html');

            expect($route.routes['/listView'].controller).toBe('cardVieController');
            expect($route.routes['/listView'].templateUrl).toEqual('views/listView.html');

            expect($route.routes['/addCustomer'].controller).toBe('addCustomController');
            expect($route.routes['/addCustomer'].templateUrl).toEqual('views/addCustomer.html');

            expect($route.routes['/editCustomer'].controller).toBe('editCustomController');
            expect($route.routes['/editCustomer'].templateUrl).toEqual('views/EditCustomer.html');

            expect($route.routes[null].redirectTo).toEqual('/');
        }));



    it('should test routeProvider', function() {


        inject(function($route, $location, $rootScope) {

            expect($route.current).toBeUndefined();
            $location.path('/listView');
            $rootScope.$digest();

            expect($route.current.templateUrl).toEqual('views/listView.html');
            expect($route.current.controller).toBe('cardVieController');

            $location.path('/otherwise');
            $rootScope.$digest();

            expect($location.path()).toBe('/');
            expect($route.current.templateUrl).toEqual('views/cardView.html');
            expect($route.current.controller).toBe('cardVieController');

            $location.path('/addCustomer');
            $rootScope.$digest();

            expect($route.current.templateUrl).toEqual('views/addCustomer.html');
            expect($route.current.controller).toBe('addCustomController');

        });
    });


});