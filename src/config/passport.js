const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");
const accModel = require("../app/models/BlogAcc");
const userModel = require("../app/models/BlogUser");

passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function (user, done) {
    done(null, user);
  });

//LocalStrategy
passport.use(
    new LocalStrategy(
      {
        // usernameField: "username",
        // passwordField: "password",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
          console.log(username,password);
        if (username == "" || password == "") {
            console.log('input trống');
          req.flash("error", "Input(s) empty !");
          return done(null, false);
        } else {
          accModel
            .findById(
              username,
            )
            .exec()
            .then((data) => {
              if (data == null) {
                console.log('username sai');
                req.flash("error", "Username's Invalid !");
                return done(null, false);
              } else if (bcrypt.compareSync(password, data.password)) {
                console.log('data.password =',data.password);
                userModel
                  .findOne({ _id: username })
                  .exec()
                  .then((user) => {
                    return done(null, user);
                  });
              } else {
                console.log('Mật khẩu sai !');   
                req.flash("error", "Password's Invalid!");
                return done(null, false);
              }
            })
            .catch(function (err) {
              return done(null, err);
            });
        }
      }
    )
  );
  //End Local