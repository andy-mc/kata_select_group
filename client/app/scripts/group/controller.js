'use strict';

angular.module('Group')
.controller('group', function ($scope, _, data) {
  $scope.controller_loaded = 'Group loaded!';

  $scope.parse_csv = function() {
    var employees_ids = Papa.parse(data.data, {delimiter: ','}).data;
    return _(employees_ids).map(function(couple){
      return [parseInt(couple[0]), parseInt(couple[1])];
    });
  };

  $scope.get_pairs = function (employees_list) {
    var employees_ids = _(employees_list)
      .chain()
      .flatten()
      .uniq()
      .value();

    var employees_frequency = _(employees_ids).map(function(id) {
      var frequency = employees_list.filter(function(couple) {
        return (couple.indexOf(id) !== -1);
      }).length;
      return [id, frequency];
    });

    var order_employees_freq = _(employees_frequency).sortBy(function(employee){
      return employee[1];
    });

    var winners = [];
    while (employees_list.length > 0) {
      var user = order_employees_freq.pop();
      if (user[1] > 1) {
        employees_list = _(employees_list).filter(function(couple){
          return (couple.indexOf(user[0]) === -1);
        });
        winners.push(user[0]);
      } else {
        _(employees_list).each(function(employee, index){
          if (index % 2 === 0) {
            winners.push(employee[0]);
          } else {
            winners.push(employee[1]);
          }
        });
        break;
      }
    }
    
    winners.sort();

    $scope.result = winners;
  };
})
.config(function ($routeProvider) {
  $routeProvider
  .when('/group', {
    templateUrl: 'scripts/group/views/group.html',
    controller: 'group', 
    resolve: {
      data: function($http) {
        return $http.get('./scripts/group/specs/test_employees.csv');
      }
    }
  });
});
