var indexRoutes = require('../routes/index.js');

exports.testAddList = function(test) {
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
  ];
  var fn = indexRoutes.addList(lists);

  var req = {
    body: {
      description : "Another List",
      categories : [
        { name: "category 1",
          items : [
            "left-handed monkey wrench",
            "quasar"
          ]
        },
        { name: "category 2" }
      ]
    }
  };

  var res = {
    json : function(obj) {
      test.equals(lists, obj.lists);
      test.equals(3, lists.length);

      test.equals(req.body.description, lists[2].description);
      test.equals(req.body.categories[0].name, lists[2].categories[0].name);

      // test.expect means 'expect 5 tests will be run'
      test.expect(4);
      test.done();
    }
  };

  fn(req, res);
};