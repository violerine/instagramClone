const mongoose = require("mongoose");
const { user } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: function(req, res) {
    console.log(req.body);
    let username = req.body.username;
    let email = req.body.email;
    if (req.body.password.length < 8) {
      res.status(500).json({
        message: "password need 8 characters"
      });
    } else {
      const salt = bcrypt.genSaltSync(7);
      const hash = bcrypt.hashSync(req.body.password, salt);
      let password = hash;
      user
        .findOne({ username })
        .then(found => {
          if (found) {
            res.status(500).json({
              message: "username is used"
            });
          } else {
            user
              .create({
                username,
                email,
                password
              })
              .then(user => {
                res.status(200).json({
                  message: "successfully sign up",
                  user
                });
              });
          }
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
        });
    }
  },
  login: function(req, res) {
    let username = req.body.username;
    let token = jwt.sign({ username }, process.env.SECRET_KEY);
    res.status(200).json({
      message: "successfully sign in",
      token,
      username
    });
  }
};
