
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {
    title: 'Shopping Lists',
    lists : [
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
  });
};