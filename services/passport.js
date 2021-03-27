const passport = require("passport");
const GooleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");

// SERIALIZE
passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

// DESERIALIZE
passport.deserializeUser((id, done) => {
  User.findOne({ googleId: id }, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GooleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      const { id, name, emails } = profile;
      const user = {
        googleId: id,
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
      };
      done(null, user);
    }
  )
);
