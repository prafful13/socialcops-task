const async = require("async");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const User = mongoose.model("users");

createUser = function(body) {
  return new Promise(async (resolve, reject) => {
    var hashedPassword = bcrypt.hashSync(body.password, 8);
    User.create(
      {
        name: body.name,
        email: body.email,
        password: hashedPassword
      },
      (error, user) => {
        if (error) {
          reject(error);
        } else {
          // create a token
          var token = jwt.sign({ id: user._id }, keys.secret, {
            expiresIn: 86400
          });
          resolve(token);
        }
      }
    );
  });
};

// checkUserWithEmail = function(body) {
//   return new Promise((resolve, reject) => {
//     var hashedPassword = bcrypt.hashSync(body.password, 8);
//     User.find({ email: body.email }, function(err, existingUser) {
//         if (err) {
//           console.log("here", existingUser);
//           reject(err);
//         } else if (existingUser === []) {
//           reject()
//         }else {
//           resolve(existingUser);
//         }
//     });
//   })
// }

module.exports = app => {
  app.post("/api/auth/register", (req, res) => {
    if (
      req.body.hasOwnProperty("email") &&
      req.body.hasOwnProperty("password") &&
      req.body.hasOwnProperty("name")
    ) {
      createUser(req.body)
        .then(token => {
          res.status(200).json({
            auth: true,
            token: token
          });
        })
        .catch(err => {
          res.json({
            auth: false,
            err: err.message
          });
        });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send("Error on the server.");
      if (!user) return res.status(404).send("No user found.");

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid)
        return res.status(401).send({ auth: false, token: null });

      var token = jwt.sign({ id: user._id }, keys.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    });
  });

  app.get("/api/auth/logout", requireLogin, (req, res) => {
    res.status(200).send({ auth: false, token: null });
  });
};
