const models = require('../models');
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  let token = req.headers.token;
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (req.params.username === decoded.username) {
    next();
  } else {
    res.status(403).json({
      message: 'you don\'t have access'
    });
  }
};
