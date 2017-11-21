'use strict';

describe('Controller: select group', function () {
  beforeEach(module('Group'));

  var controller;
  var scope;
  var data = '1009, 2011\n1017, 2011';

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    scope.data = data;
    controller = $controller('group', {
      $scope: scope
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

    it('should return case 3', function(){
      var input = [
        [1009, 2000],
        [1009, 2001],
        [1001, 2002],
        [1002, 2003]
      ];

      scope.get_pairs(input);
      expect(scope.result).toEqual([1001, 1009, 2003]);
    });
    
    it('should return case 4', function(){
      var input = [
        [1009, 2011],
        [1017, 2011],
        [1007, 2017],
        [1004, 2018],
        [1007, 2018],
        [1018, 2018],
        [1018, 2011]
      ];

      scope.get_pairs(input);
      expect(scope.result).toEqual([1007, 2011, 2018]);
    });
    
    it('should return case 5', function(){
      var input = [
        [1009, 2015],
        [1009, 2012],
        [1004, 2012],
        [1004, 2015]
      ];

      scope.get_pairs(input);
      expect(scope.result).toEqual([2012, 2015]);
    });
    
    xit('should return case 6', function(){
      var input = [
        [1002, 2011],
        [1002, 2012],
        [1003, 2012],
        [1003, 2014],
        [1004, 2013]
      ];

      scope.get_pairs(input);
      expect(scope.result).toEqual([1002,1003,1004]);
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
  });

});
