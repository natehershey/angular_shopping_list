
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes/index');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var schemas = require('./models/ShoppingList.js');

var app = express();

var Mongoose = require('mongoose');
// var db = Mongoose.createConnection('localhost', 'wutchuneed-dev');
var db = Mongoose.createConnection('mongodb://wutchuneed:TurtleFace@troup.mongohq.com:10093/wutchuneed-hq');

var ItemSchema = schemas.ItemSchema;
var CategorySchema = schemas.CategorySchema;
var ShoppingListSchema = schemas.ShoppingListSchema;

var Item = db.model('Item', ItemSchema);
var Category = db.model('Category', CategorySchema);
var ShoppingList = db.model('ShoppingList', ShoppingListSchema);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// var lists = [
//   { description : "Groceries",
//     categories : [
//       { description : "produce",
//         items : [
//           "spinach",
//           "apples",
//           "bananas"
//         ]
//       },
//       { description : "dairy",
//         items : [
//           "eggs",
//           "sandwich cheese",
//           "yogurt"
//         ],
//       },
//       { description : "grains",
//         items : [
//           "sandwich bread",
//           "italian bread"
//         ]
//       }
//     ]
//   },
//   { description : "Household",
//     categories : [
//       { description: "stuff",
//         items : [
//           "batteries (LR44)",
//           "windex"
//         ]
//       }
//     ]
//   }
// ]

app.get('/', routes.index(ShoppingList));
app.get('/users', user.list);
app.get('/shopping_lists', routes.getLists(ShoppingList));

app.get('/shopping_list/:id', routes.showList(ShoppingList));

app.put('/shopping_list/:id', routes.updateList(ShoppingList));

app.post('/shopping_list', routes.addList(ShoppingList));
app.post('/shopping_list/:id/delete', routes.deleteList(ShoppingList));

app.post('/item/:id/delete', routes.deleteItem(ShoppingList));
app.post('/category/:id/delete', routes.deleteCategory(ShoppingList));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});






