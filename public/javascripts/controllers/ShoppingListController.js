function ShoppingListController($scope) {
  $scope.shoppingLists = [];

  // $scope.doneFilter = { done : true };
  // $scope.notDoneFilter = { done : false };

  $scope.setShoppingLists = function(lists) {
    $scope.shoppingLists = lists;
  };
}