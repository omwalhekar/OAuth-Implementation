const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  email: String,
  firstName: String,
  lastName: String,
});

mongoose.model("users", userSchema);
