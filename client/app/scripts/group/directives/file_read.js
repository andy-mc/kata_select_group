'use strict';

angular.module('Group')
.directive('fileread', function () {
  return {
    scope: {
      fileread: '='
    },
    link: function (scope, element, attributes) {
      element.bind('change', function (changeEvent) {
        var file = changeEvent.target.files[0];
        var reader = new FileReader();

        reader.onload = function (loadEvent) {
          scope.$apply(function () {
            scope.fileread = loadEvent.target.result;
          });
        }
        
        reader.readAsText(file);
      });
    }
  }
});
