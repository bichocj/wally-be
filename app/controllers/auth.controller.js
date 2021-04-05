const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

exports.signIn = (req, res) => {
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const pwdHash = crypto.createHash('sha256').update(req.body.password).digest('hex');
    
      const passwordIsValid = pwdHash === user.password;        
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const userIsAdmin = user.role === 'admin'
      if (!userIsAdmin) {
        return res.status(401).send({
          accessToken: null,
          message: "User is not admin"
        });
      }
      
      if (!user.active) {
        return res.status(401).send({
          accessToken: null,
          message: "User is not activated"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken: token
      });
    });
};
