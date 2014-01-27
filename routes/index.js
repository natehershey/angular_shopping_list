/*
 * GET home page.
 */

exports.index = function(ShoppingList) {
  return function(req, res) {
    ShoppingList.find({}, function(error, shoppingLists) {
      res.render('index', {
        title: 'Shopping Lists',
        shoppingLists : shoppingLists
      });
    });
  };
};

exports.getLists = function(ShoppingList) {
  return function(req, res) {
    ShoppingList.find({}, function(error, shoppingLists) {
      res.json({ shoppingLists : shoppingLists,
                 error : error
      });
    });
  };
};

exports.showList = function(ShoppingList) {
  return function(req, res) {
    ShoppingList.findOne({ _id : req.params.id }, function(error, shoppingList) {
      // console.log("shoppingList: " + JSON.stringify(shoppingList));
      // res.render('show', {
      //   title: shoppingList.description,
      //   shoppingList : JSON.stringify(shoppingList),
      //   error : error
      // });
      res.json({ shoppingList : shoppingList,
                 error : error
      });
    });
  };
};

exports.addList = function(ShoppingList) {
  return function(req, res) {
    var shoppingList = new ShoppingList(req.body);
    shoppingList.save(function(error, shoppingList) {
      if (error || !shoppingList) {
        res.json({ error : error });
      } else {
        res.json({ shoppingList : shoppingList });
      }
    });
  };
};

exports.deleteList = function(ShoppingList) {
  return function(req, res) {
    console.log("params: " + req.body);
    ShoppingList.findOne({ _id : req.params.id }).remove(function(error, shoppingList) {
      console.log("error: " + error);
      console.log("list:  " + shoppingList);
      ShoppingList.find({}, function(error, shoppingLists) {
        res.json({ shoppingLists : shoppingLists});
      });
    });
  };
};

exports.updateList = function(ShoppingList) {
  return function(req, res) {
    var newList = req.body.shoppingList;
    var id = newList._id;
    delete newList._id;

    ShoppingList.findByIdAndUpdate(id, { $set: newList}, function (err, shoppingList) {
      if (err) {
        console.log("error: " + err);
        res.json({ error : err});
      }
      res.json({ shoppingList : shoppingList });
    });
  };
};

exports.deleteCategory = function(ShoppingList) {
  return function(req, res) {
    ShoppingList.findById(req.body.listId, {}, function (err, list) {
      removed = list.categories.id(req.params.id).remove();
      list.save(function (err) {
        res.json({ error: err, shoppingList : list});
      });
    });
  };
};

exports.deleteItem = function(ShoppingList) {
  return function(req, res) {

    console.log("req.params.listId: " + req.body.listId);
    console.log("req.params.categoryId: " + req.body.categoryId);

    ShoppingList.findById(req.body.listId, {}, function (err, list) {
      console.log("list: " + list);
      console.log("category: " + list.categories.id(req.body.categoryId));
      console.log("item: " + list.categories.id(req.body.categoryId).items.id(req.params.id));
      removed = list.categories.id(req.body.categoryId).items.id(req.params.id).remove();
      list.save(function (err) {
        res.json({ error: err, shoppingList : list});
      });
    });
  };
};

function xinspect(o,i){
  if(typeof i=='undefined')i='';
  if(i.length>50)return '[MAX ITERATIONS]';
  var r=[];
  for(var p in o){
      var t=typeof o[p];
      r.push(i+'"'+p+'" ('+t+') => '+(t=='object' ? 'object:'+xinspect(o[p],i+'  ') : o[p]+''));
  }
  return r.join(i+'\n');
}








