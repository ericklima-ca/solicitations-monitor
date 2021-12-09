const { model, Schema } = require("mongoose");

const userSchema = Schema({
  enroll: String,
  name: String,
  lastName: String,
  center: String,
  email: String,
  password: String,
  office: Boolean,
});

const User = model("User", userSchema);

module.exports = User;
