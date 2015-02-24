'use strict';

var User = require('../../models/user');

module.exports = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    reply.view('templates/users/login');
  }
};
