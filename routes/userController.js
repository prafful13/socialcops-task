const mongoose = require("mongoose");

const User = mongoose.model("users");

module.exports = app => {
  // CREATES A NEW USER
  app.post("/", (req, res) => {
    User.create(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      },
      (err, user) => {
        if (err)
          return res
            .status(500)
            .send(
              "There was a problem adding the information to the database."
            );
        res.status(200).send(user);
      }
    );
  });

  // RETURNS ALL THE USERS IN THE DATABASE
  app.get("/", (req, res) => {
    User.find({}, (err, users) => {
      if (err)
        return res.status(500).send("There was a problem finding the users.");
      res.status(200).send(users);
    });
  });

  // GETS A SINGLE USER FROM THE DATABASE
  app.get("/:id", (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err)
        return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      res.status(200).send(user);
    });
  });

  // DELETES A USER FROM THE DATABASE
  app.delete("/:id", (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err)
        return res.status(500).send("There was a problem deleting the user.");
      res.status(200).send("User: " + user.name + " was deleted.");
    });
  });

  // UPDATES A SINGLE USER IN THE DATABASE
  app.put("/:id", (req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, user) => {
        if (err)
          return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
      }
    );
  });
};
