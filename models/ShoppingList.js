var Mongoose = require('mongoose');

var ItemSchema = new Mongoose.Schema({
  description : { type : String, required : true },
  quantity : { type : Number },
  measure : {type : String },
  status : {type : String }
});
exports.ItemSchema = ItemSchema;

var CategorySchema = new Mongoose.Schema({
  description : {type : String, required : true },
  empty : Boolean,
  items : [ItemSchema]
});

exports.CategorySchema = CategorySchema;

var ShoppingListSchema = new Mongoose.Schema({
  description : { type : String, required : true },
  categories : [CategorySchema]
});

exports.ShoppingListSchema = ShoppingListSchema;

var UserSchema = new Mongoose.Schema({
  oauthID: Number,
  name: String
});

exports.UserSchema = UserSchema;

// var Item = Mongoose.model('items', ItemSchema);
// var Category = Mongoose.model('categories', CategorySchema)