const mongoose = require("mongoose");
const keys = require("../config/keys");

//  Mongoose Connection
mongoose.connect(keys.mongoTestURI);

mongoose.connection.on("connected", function() {
  console.log("Mongoose connected");
});

mongoose.connection.on("open", function(err) {
  console.log("Mongoose open");
});

// If the connection throws an error
mongoose.connection.on("error", function(err) {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", function() {
  console.log("Mongoose default connection disconnected");
});
