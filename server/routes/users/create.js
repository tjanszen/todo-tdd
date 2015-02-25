'use strict';

var Joi = require('joi');
var User = require('../../models/user');

module.exports = {
  auth: false,
  validate: {
    payload: {
      email: Joi.string().email(),
      password: Joi.string().min(3)
    }
  },
  handler: function(request, reply) {
    User.register(request.payload, function(err) {
      if (err) {
        reply.redirect('/register');
      } else {
        reply.redirect('/login');
      }
    });
  }
};
