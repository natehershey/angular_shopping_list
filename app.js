
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var list = require('./routes/list');
var http = require('http');
var path = require('path');

var app = express();

var Mongoose = require('mongoose');
var db = Mongoose.createConnection('localhost', 'mytestapp');

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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var lists = [
  { description : "Groceries",
    categories : [
      { name : "produce",
        items : [
          "spinach",
          "apples",
          "bananas"
        ]
      },
      { name : "dairy",
        items : [
          "eggs",
          "sandwich cheese",
          "yogurt"
        ],
      },
      { name : "grains",
        items : [
          "sandwich bread",
          "italian bread"
        ]
      }
    ]
  },
  { description : "Household",
    categories : [
      { name: "stuff",
        items : [
          "batteries (LR44)",
          "windex"
        ]
      }
    ]
  }
]

app.get('/', routes.index(lists));
app.get('/lists', routes.index(lists));
app.get('/list', list.show(lists));

app.post('/add_list.json', routes.addList(lists));
app.post('/delete_list.json', routes.deleteList(lists));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
