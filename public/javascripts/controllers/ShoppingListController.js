function ShoppingListController($scope, $http) {
  $scope.shoppingLists = [];
  $scope.newShoppingList = {
    description : "New List",
    categories : []
  };
  $scope.currentShoppingList = {description: ""};

  // $scope.doneFilter = { done : true };
  // $scope.notDoneFilter = { done : false };

  $scope.setShoppingLists = function(lists) {
    $scope.shoppingLists = lists;
  };

  $scope.addNewShoppingList = function() {
    $http.post('/add_list.json', $scope.newShoppingList).success(function(data) {
      $scope.shoppingLists = data.lists;
      $scope.newShoppingList.description = '';
    });
  };

  $scope.deleteShoppingList = function(id) {
    $http.post('/delete_list.json', {"id": id}).success(function(data) {
      $scope.shoppingLists = data.lists;
      $scope.currentShoppingList = {description: ""};
    });
  };

  $scope.showShoppingList = function(id) {
    var i=0;
    for(i; i<$scope.shoppingLists.length; i++) {
      if($scope.shoppingLists[i].description == id) {
        $scope.currentShoppingList = $scope.shoppingLists[i];
      }
    }
  };
};