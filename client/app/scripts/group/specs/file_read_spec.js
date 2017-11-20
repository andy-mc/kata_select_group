'use strict';

describe('Directive: file_read', function () {
  beforeEach(module('Group'));

  var scope;
  var element;
  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.spy_function = jasmine.createSpy('spy_function');
    element = $('<input type="file" fileread="spy_function"/>');
    $compile(element)(scope);
  }));

  describe('on_change input file', function() {
      fit('should trigger callback', function(){
        element.trigger('change');
        expect(scope.spy_function).toHaveBeenCalled();
      });
  });
});
