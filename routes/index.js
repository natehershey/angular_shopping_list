
/*
 * GET home page.
 */

exports.index = function(lists) {
  return function(req, res){
    res.render('index', {
      title: 'Shopping Lists',
      lists : lists
    });
  };
};

exports.addList = function(lists) {
  return function(req, res) {
    lists.push(req.body);
    res.json({ lists : lists });
  };
};

exports.deleteList = function(lists) {
  return function(req, res) {
    var id = req.body.id,
        i=0;
    console.log("looking for list '" + id + "'' to delete");
    for (i; i<lists.length; i++) {
      if(lists[i].description == id) {
        console.log("Found it");
        lists.splice(i,1);
      }
    }
    res.json({ lists : lists });
  };
};