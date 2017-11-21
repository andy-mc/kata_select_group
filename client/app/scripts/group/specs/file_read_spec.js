'use strict';

describe('Directive: file_read', function () {
  beforeEach(module('Group'));

  var scope;
  var isolate_scope;
  var element;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.data = '';
    element = $('<input type="file" fileread="data"/>');
    $compile(element)(scope);
    isolate_scope = element.isolateScope();
    scope.$digest();

  }));

  describe('on_change input file', function() {
      xit('should trigger callback', function(){
        var event = $.Event('change', {
          target:{
            files: [new Blob(['data'])]
          }
        });

        element.trigger(event);
        expect(scope.data).toBe('data');
      });
  });
});
