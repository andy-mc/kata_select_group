'use strict';

describe('Controller: select group', function () {
  beforeEach(module('Group'));

  var controller;
  var scope;
  var data = {data: '1009, 2011\n1017, 2011' };

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('group', {
      $scope: scope,
      data: data
    });
  }));

  describe('On instance', function () {
    it('should set "controller_loaded" variable in scope', function () {
      expect(scope.controller_loaded).toContain('loaded');
    });
  });

  describe('When parsing csv', function() {
    it('should read the csv file', function() {
      
    });

    it('should convert csv file to an 2D array', function () {
      expect(scope.parse_csv()).toEqual([
        [1009, 2011],
        [1017, 2011]
      ]);
    });
  });

  describe('when get result', function () {
    it('should return case 1', function(){
      var input = [
        [1009, 2011],
        [1017, 2011]
      ];

      scope.get_pairs(input);
      expect(scope.result).toEqual([2011]);
    });

    it('should return case 2', function(){
      var input = [
        [1009, 2000],
        [1009, 2001],
        [1002, 2002],
        [1003, 2002]
      ];

      scope.get_pairs(input);
      expect(scope.result).toEqual([1009, 2002]);
    });

    it('should return case 2', function(){
      var input = [
        [1009, 2000],
        [1009, 2001],
        [1001, 2002],
        [1002, 2003]
      ];

      scope.get_pairs(input);
      expect(scope.result).toEqual([1001, 1009, 2003]);
    });
  });

  describe('when going to /group', function () {

    var route, location, rootScope, httpBackend;
    var http;

    beforeEach(inject(function ($route, $location, $rootScope, $httpBackend, $http) {
      route = $route;
      location = $location;
      rootScope = $rootScope;
      httpBackend = $httpBackend;
      http = $http;
    
      httpBackend.when('GET', 'scripts/group/views/group.html').respond('<div></div>');
      httpBackend.when('GET', './scripts/group/specs/test_employees.csv').respond('');
    }));

    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should use minesweeper.html and controller', function () {
      expect(route.current).toBeUndefined();

      location.path('/group');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/group/views/group.html');
      expect(route.current.controller).toBe('group');
    });

    it('should read test_employees.csv file correctly', function() {
      spyOn(http, 'get').and.returnValue('data_csv');

      var result = route.routes['/group'].resolve.data(http);

      expect(http.get).toHaveBeenCalledWith('./scripts/group/specs/test_employees.csv'); 
      expect(result).toBe('data_csv');
    });
  });

});
