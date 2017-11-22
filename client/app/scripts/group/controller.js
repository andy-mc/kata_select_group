'use strict';

angular.module('Group')
.controller('group', function ($scope, _) {
  $scope.controller_loaded = 'Group loaded!';

  $scope.parse_csv = function() {
    var employees_ids = Papa.parse($scope.data, {delimiter: ','}).data;
    return _(employees_ids).map(function(couple){
      return [parseInt(couple[0]), parseInt(couple[1])];
    });
  };

  $scope.get_pairs = function (employees_list) {
    function employees_frequency(input) {
      var employees_ids = _(input)
      .chain()
      .flatten()
      .uniq()
      .value();
      
      var employees_freq = _(employees_ids).map(function(id) {
        var frequency = input.filter(function(couple) {
          return (couple.indexOf(id) !== -1);
        }).length;
        return [id, frequency];
      });
      
      var order_employees_freq = _(employees_freq).sortBy(function(employee){
        return [employee[1], employee[0]];
      });

      var max_freq = _(order_employees_freq).max(function(employee){
        return employee[1];
      })[1];
      
      var max_employees = _(order_employees_freq).filter(function(employee) {
        return employee[1] === max_freq
      })

      return max_employees
    }

    var winners = [];
    while (employees_list.length > 0) {
      var user = employees_frequency(employees_list).pop();
      var users_exist_in_list = _(employees_list).chain()
      .flatten()
      .contains(user[0])
      .value();

      if (user[1] > 1 && users_exist_in_list) {
        employees_list = _(employees_list).filter(function(couple){
          return (couple.indexOf(user[0]) === -1);
        });
        winners.push(user[0]);
      }

      if (user[1] === 1) {
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
    controller: 'group'
  });
});
