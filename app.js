/**
 * Module dependencies.
 */
var fs = require('fs');
var express = require('express');
var routes = require('./routes/index');
var app = express();
var http = require('http');
var path = require('path');
var Mongoose = require('mongoose');
var passport = require('passport');
var schemas = require('./models/ShoppingList.js');
var auth = require('./authentication.js');

// var db = Mongoose.createConnection('localhost', 'wutchuneed-dev');
var db = Mongoose.createConnection('mongodb://wutchuneed:TurtleFace@troup.mongohq.com:10093/wutchuneed-hq');

var ItemSchema = schemas.ItemSchema;
var CategorySchema = schemas.CategorySchema;
var ShoppingListSchema = schemas.ShoppingListSchema;
var UserSchema = schemas.UserSchema;

var Item = db.model('Item', ItemSchema);
var Category = db.model('Category', CategorySchema);
var ShoppingList = db.model('ShoppingList', ShoppingListSchema);
//var Mongoose = require('mongoose');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: 'my_precious' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/google',
  passport.authenticate('google'),
  function(req, res){
});
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  function(req, res) {
    res.redirect('/');
  }
);
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/', ensureAuthenticated, routes.index(ShoppingList));

app.get('/shopping_lists', ensureAuthenticated, routes.getLists(ShoppingList));

app.get('/shopping_list/:id', ensureAuthenticated, routes.showList(ShoppingList));

app.put('/shopping_list/:id', ensureAuthenticated, routes.updateList(ShoppingList));

app.post('/shopping_list', ensureAuthenticated, routes.addList(ShoppingList));
app.post('/shopping_list/:id/delete', ensureAuthenticated, routes.deleteList(ShoppingList));

app.post('/item/:id/delete', ensureAuthenticated, routes.deleteItem(ShoppingList));
app.post('/category/:id/delete', ensureAuthenticated, routes.deleteCategory(ShoppingList));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  console.log("ensureAuthenticated");
  if (req.isAuthenticated() && checkEmail(req)) { return next(); }
  res.redirect('/auth/google')
};

function checkEmail(req) {
  debugger;
  emails = req.session.passport.user.emails;
  for (var i=0; i<emails.length; i++) {
    if (emails[i].value == "natehershey@gmail.com" || emails[i].value == "becky.hoppe@gmail.com") {
      return true;
    }
    else {
      return false;
    }
  }
};








