'use strict';

angular.module('Group')
.directive("fileread", function () {
  return {
    scope: {
    fileread: "="
    },
    link: function (scope, element, attributes) {
        element.bind("change", function () {
            console.log('kjdjkfhsdjkfh');
        })
        /* element.bind("change", function (changeEvent) {
            var reader = new FileReader();
            reader.onload = function (loadEvent) {
                scope.$apply(function () {
                    console.log('>>', loadEvent.target.result)
                    scope.fileread = loadEvent.target.result;
                });
            }

            reader.readAsDataURL(changeEvent.target.files[0]);
            console.log(JSON.stringify(reader));
        }); */
    }
  }
});
