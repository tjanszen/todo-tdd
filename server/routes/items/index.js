'use strict';

var Item = require('../../models/item');

module.exports = {
  handler: function(request, reply) {
    Item.find({userId:request.auth.credentials._id}, function(err, items) {
      reply.view('templates/items/index', {items:items});
    });
  }
};