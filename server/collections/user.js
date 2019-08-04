const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(username) {
        if (username.length > 5) {
          return username;
        }
      },
      message: "you must choose another username"
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(email) {
        const validEmail = email.includes("@");
        return validEmail;
      },
      message: "email already taken"
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(password) {
        if (
          password.length > 5 &&
          password.match(/[A-Z]/g) &&
          password.match(/[a-z]/g) &&
          password.match(/[0-9]/)
        ) {
          return password;
        }
      },
      message: "you must choose another password"
    }
  }
});

module.exports = mongoose.model("user", userSchema);
