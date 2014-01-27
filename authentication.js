var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
// var config = require('./oauth.js');

module.exports = passport.use(new GoogleStrategy({
  // returnURL: 'http://localhost:3000/auth/google/callback',
  // realm: 'http://localhost:3000'
  returnURL: 'http://wutchuneed.herokuapp.com/auth/google/callback',
  realm: 'http://wutchuneed.herokuapp.com'
},
function(identifier, profile, done) {
  process.nextTick(function () {
    profile.identifier = identifier;
    return done(null, profile);
  });
}
));




// passport.use(new GoogleStrategy({
//  returnURL: config.google.returnURL,
//  realm: config.google.realm
// },
// function(accessToken, refreshToken, profile, done) {
// User.findOne({ oauthID: profile.id }, function(err, user) {
//  if(err) { console.log(err); }
//  if (!err && user != null) {
//    done(null, user);
//  } else {
//    var user = new User({
//      oauthID: profile.id,
//      name: profile.displayName,
//      created: Date.now()
//    });
//    // user.save(function(err) {
//    //   if(err) {
//    //     console.log(err);
//    //   } else {
//    //     console.log("saving user ...");
//    //     done(null, user);
//    //   };
//    // });
//  };
// });
// }
// ));
