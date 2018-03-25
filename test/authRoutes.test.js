process.env.NODE_ENV = "test";

const mongoose = require("mongoose");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const should = chai.should();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

const User = require("../models/User");

chai.use(chaiHttp);
var removeUsers = function() {
  return new Promise((resolve, reject) => {
    User.remove({}, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
describe("authRoutes", () => {
  var token;

  describe("/POST register", done => {
    it("it should register new users", done => {
      let users = [
        {
          name: "Shivansh Bajaj2",
          email: "shivansh.bajaj@gmail.com",
          password: "password",
          response: {
            auth: true,
            status: 200
          }
        },
        {
          name: "Shivansh Bajaj",
          email: "shivansh.bajaj@gmail.com",
          password: "password",
          response: {
            auth: false,
            status: 200,
            err: "User already exists"
          }
        }
      ];

      removeUsers()
        .then(() => {
          console.log("making request for each test case");
          // users.forEach((user, index) => {
          for (let i = 0; i < users.length; i++) {
            let user = users[i];
            User.find({}, (err1, user1) => {
              console.log("test", err1, user1);
              let agent = chai.request(server).post("/api/auth/register");
              agent.send(user).end((err, res) => {
                res.body.should.be.a("object");
                res.should.have.status(user.response.status);
                res.body.should.have.property("auth").eql(user.response.auth);
                if (user.response.auth === true) {
                  res.body.should.have.property("token");
                  token = res.body.token;
                } else if (user.response.auth == false) {
                  res.body.should.have.property("err");
                }

                if (i == users.length - 1) {
                  console.log(res.body);
                  done();
                }
              });
            });
          }
        })
        .catch(err => {
          console.log("error:", err);
        });
    });
  });

  describe("/POST login", done => {
    it("it should login old users", done => {
      let users = [
        {
          email: "shivansh.bajaj@gmail.com",
          password: "password",
          response: {
            auth: true,
            status: 200
          }
        },
        {
          email: "shivansh.bajaj@gmail.com",
          password: "password12",
          response: {
            auth: false,
            status: 401
          }
        }
      ];

      users.forEach((user, index) => {
        var agent = chai.request(server).post("/api/auth/login");
        agent.send(user).end((err, res) => {
          res.body.should.be.a("object");
          res.should.have.status(user.response.status);
          res.body.should.have.property("auth").eql(user.response.auth);
          if (user.response.auth === true) {
            res.body.should.have.property("token");
            token = res.body.token;
          }
          if (index == users.length - 1) {
            done();
          }
        });
      });
    });
  });
});
