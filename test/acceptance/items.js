/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var User = require('../../server/models/user');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var server = require('../../server/index');

require('../../server/index');

describe('items route', function() {
  beforeEach(function(done) {
    User.remove(function() {
      User.register({email:'test@test.test', password:'123'}, done);
    });
  });
  describe('get /items/new', function() {
    it('should display the new item page', function(done) {
      var options = {method: 'get', url:'/items/new'};
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(200);
        expect(response.payload).to.include('New Item');
        done();
      });
    });
  });


});
