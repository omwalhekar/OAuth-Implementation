const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/connectdb");
const PORT = process.env.PORT || 5000;
require("./models/User");
require("./services/passport");

connectDB();

app.use(bodyParser.json());

app.use(cookieParser());
app.use(
  session({ secret: keys.cookieKey, resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoute")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("server running on " + PORT);
});
