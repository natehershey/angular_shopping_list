function ShoppingListController($scope, $http) {
  $scope.shoppingLists = [];

  $scope.newShoppingList = {
    description : "New List",
    categories : []
  };

  $scope.currentCategory = {};
  $scope.currentItem = null;
  $scope.currentShoppingList = null;

  $scope.showAddCategory = false;
  $scope.showChangeName = false;
  $scope.showChangeCategoryName = false;
  $scope.showAddItem = false;
  $scope.showChangeItemName = false;

  $scope.newListName = null;
  $scope.newCategoryName = null;
  $scope.categoryName = null;
  $scope.newItemName = null;
  $scope.updatedItemName = null;
  $scope.currentError = null;

  // $scope.doneFilter = { done : true };
  // $scope.notDoneFilter = { done : false };

  $scope.setShoppingLists = function(lists) {
    $scope.shoppingLists = lists;
  };

  $scope.setCurrentList = function(list) {
    if (list) {
      $scope.currentShoppingList = list;
    }
  };

  $scope.clearCurrentList = function() {
    $scope.currentShoppingList = null;
  };

  $scope.addNewShoppingList = function() {
    if($scope.newShoppingList.description != '') {
      $http.post('/shopping_list', $scope.newShoppingList).success(function(data) {
        if (data.shoppingList) {
          $scope.shoppingLists.push(data.shoppingList);
          $scope.newShoppingList.description = '';
        } else {
          alert(JSON.stringify(data));
        }
      });
    } else {
      alert("Gotta have a name...");
    }
  };

  $scope.deleteShoppingList = function(id) {
    $http.post('/shopping_list/' + id + '/delete', {}).success(function(data) {
      $scope.clearCurrentList();
      $scope.shoppingLists = data.shoppingLists;
    });
  };

  $scope.showShoppingList = function(id) {
    $http.get('/shopping_list/' + id, {}).success(function(data) {
      $scope.setCurrentList(data.shoppingList);
      $scope.currentError = data.error;
    });
  };

  $scope.updateShoppingList = function() {
    $http.put('/shopping_list/' + $scope.currentShoppingList._id, {shoppingList : $scope.currentShoppingList}).success(function(data) {
      $scope.showChangeName = false;
      $scope.showAddCategory = false;
      if (data.error) {
        $scope.currentError = data.error;
      }
      $scope.currentShoppingList = data.shoppingList;
      $scope.getShoppingLists();
    });
  };

  $scope.getShoppingLists = function() {
    $http.get('/shopping_lists', {}).success(function(data) {
      if (data.error) {
        $scope.currentError = data.error;
      }
      if (data.shoppingLists) {
        $scope.shoppingLists = data.shoppingLists;
      }
    });
  };

  $scope.changeListName = function() {
    if($scope.newListName) {
      $scope.currentShoppingList.description = $scope.newListName;
      $scope.updateShoppingList();
    } else {
      alert("Gotta have a name");
    }
  };

  $scope.deleteCategory = function(category) {
    $http.post('/category/' + category._id + '/delete', {listId : $scope.currentShoppingList._id}).success(function(data) {
      $scope.currentShoppingList = data.shoppingList;
      $scope.getShoppingLists();
    });
  };

  $scope.addCategory = function() {
    if ($scope.newCategoryName != "") {
      $scope.currentShoppingList.categories.push({
        description : $scope.newCategoryName,
        empty : true,
        hideChildren : false,
        items : []
      });
      $scope.updateShoppingList($scope.currentShoppingList);
      $scope.showAddCategory = false;
    } else {
      alert("Gotta have a name");
    }
  };

  $scope.changeCategoryName = function() {
    if($scope.currentCategory.newName) {
      $scope.currentCategory.description = $scope.currentCategory.newName;
      $scope.updateShoppingList();
      $scope.showChangeCategoryName = false;
    }
    else
      alert("Gotta have a name");
  };

  $scope.updateCategoryStatus = function(category) {
    for(var i = 0; i<category.items.length; i++) {
      if (category.items[i].status === "needed") {
        category.empty = false;
        return;
      }
    }
    category.empty = true;
    category.hideChildren = true;
  };

  $scope.toggleHideChildren = function(category) {
    category.hideChildren = !(category.hideChildren);
  };

  $scope.deleteItem = function(category, item) {
    $http.post('/item/' + item._id + '/delete', {listId : $scope.currentShoppingList._id, categoryId : category._id}).success(function(data) {
      $scope.currentShoppingList = data.shoppingList;
      $scope.getShoppingLists();
      $scope.updateCategoryStatus(category);
    });
  };

  $scope.addItem = function(name) {
    if (name) {
      $scope.currentCategory.items.push({
        description : name,
        quantity : 0,
        measure : "",
        status : "needed"
      });
      $scope.currentCategory.hideChildren = false;
      $scope.updateShoppingList($scope.currentShoppingList);
      $scope.showAddItem = false;
      $scope.updateCategoryStatus(category);
    } else {
      alert("gotta have a name");
    }
  };

  $scope.cycleItemStatus = function(item, category) {
    var statusList = ["needed", "in-cart", "purchased"];
    if (item.status === "needed") {
      item.status = "in-cart";
    }
    else {
      item.status = "needed";
    }
    $scope.updateCategoryStatus(category);
  };

  $scope.changeItemName = function() {
    if ($scope.currentItem.newName) {
      $scope.currentItem.description = $scope.currentItem.newName;
      $scope.updateShoppingList();
      $scope.showChangeItemName = false;
    } else {
      alert("Gotta have a name");
    }
  };

  $scope.toggleChangeNameField = function() {
    var toggled = !$scope.showChangeName;
    $scope.hideAllInputs();
    $scope.clearAllInputs();
    $scope.showChangeName = toggled;
  };
  $scope.toggleAddCategoryField = function() {
    var toggled = !$scope.showAddCategory;
    $scope.hideAllInputs();
    $scope.showAddCategory = toggled;
  };
  $scope.toggleChangeCategoryNameField = function(category) {
    var toggled = !$scope.showChangeCategoryName;
    $scope.hideAllInputs();
    $scope.clearAllInputs();
    $scope.updatedCategoryName = null;
    $scope.showChangeCategoryName = toggled;
    $scope.currentCategory = category;
  };
  $scope.toggleAddItemField = function(category) {
    var toggled = !$scope.showAddItem;
    $scope.hideAllInputs();
    $scope.clearAllInputs();
    $scope.showAddItem = toggled;
    $scope.currentCategory = category;
  };
  $scope.toggleChangeItemNameField = function(item) {
    var toggled = !$scope.showChangeItemName;
    $scope.hideAllInputs();
    $scope.clearAllInputs();
    $scope.showChangeItemName = !$scope.showChangeItemName;
    $scope.currentItem = item;
  };

  $scope.findCurrentCategoryIndex = function() {
    return $scope.findCategoryIndexByName($scope.currentCategory);
  };

  $scope.findCategoryIndexByName = function(name) {
    var theName,
        i=0,
        cat_length = $scope.currentShoppingList.categories.length;

    for(i; i<cat_length; i++) {
      theName = $scope.currentShoppingList.categories[i].name;
      if (theName === name) {
        console.log("found category named " + theName);
        return i;
      }
    }
  };
  $scope.findItemIndexByName = function(name) {
    var theName,
        i=0,
        num_items,
        cat_index;

    debugger;
    cat_index = $scope.findCategoryIndexByName($scope.currentCategory);
    num_items = $scope.currentShoppingList.categories[cat_index].items.length;
    for (i; i<num_items; i++) {
      theName = $scope.currentShoppingList.categories[cat_index].items[i].name;
      if (theName === name) {
        console.log("found item named " + theName);
        return i;
      }
    }
  };

  $scope.findItemIndexByCategoryAndName = function(category, item) {
    var cat_index,
        i=0;
    debugger;
    catIndex = $scope.findCategoryIndexByName(category);
    itemsLength = $scope.currentShoppingList.categories[cat_index].items.length;
    for (i; i<itemsLength; i++) {
      if ($scope.currentShoppingList.categories[cat_index].items[i].name === item) {
        return i;
      }
    }
  };

  $scope.hideAllInputs = function() {
    $scope.showAddCategory = false;
    $scope.showChangeName = false;
    $scope.showChangeCategoryName = false;
    $scope.showAddItem = false;
    $scope.showChangeItemName = false;
  };

  $scope.clearAllInputs = function() {
    $scope.newListName = null;
    $scope.newCategoryName = null;
    $scope.updatedCategoryName = null;
    $scope.newItemName = null;
    $scope.updatedItemName = null;
    $scope.currentError = null;
  };
}







