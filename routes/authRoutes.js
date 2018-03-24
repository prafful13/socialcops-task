const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const User = mongoose.model("users");

module.exports = app => {
  app.post("/api/auth/register", async (req, res) => {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.send("User already exists");
    } else {
      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
        },
        (err, user) => {
          if (err)
            return res
              .status(500)
              .send("There was a problem registering the user.");
          // create a token
          var token = jwt.sign({ id: user._id }, keys.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token });
        }
      );
    }
  });

  app.get("/api/auth/me", requireLogin, (req, res) => {
    User.findById(req.userId, { password: 0 }, (err, user) => {
      if (err)
        return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");

      res.status(200).send(user);
    });
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

  app.get("/api/auth/logout", (req, res) => {
    res.status(200).send({ auth: false, token: null });
  });
};
``;
