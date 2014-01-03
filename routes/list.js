
/*
 * GET users listing.
 */

exports.show = function(lists) {
  return function(req, res){
    debugger;
    console.log("request: " + req);
    res.send("respond with a resource");
  };
};