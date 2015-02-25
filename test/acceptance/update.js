/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var User = require('../../server/models/user');
var Item = require('../../server/models/item');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var server = require('../../server/index');
var cookie;
var item;
var bob;

describe('items update route', function() {
  beforeEach(function(done) {
    User.remove(function() {
      User.register({email:'b@c.d', password:'1234'}, function(err, user) {
        bob = user;
        var options = {
          method: 'post',
          url:'/authenticate',
          payload:{
            email:'b@c.d',
            password: '1234'
          }
        };
        server.inject(options, function(response) {
          cookie = response.headers['set-cookie'][0].match(/snickerdoodle=[^;]+/)[0];
          item = new Item({title:'Title', due:'2015-02-25',
            tags:['banana, apple'], priority:'High', userId: bob._id});
          item.save(function() {
            done();
          });
        });
      });
    });
  });
  describe('items completion toggle', function() {
    it('should toggle the completion', function(done) {
      var options = {
        method: 'post',
        url: '/items/' + item._id + '/toggle',
        headers: {
          cookie: cookie  
        }
      };
      server.inject(options, function(response) {
        expect(response.statusCode).to.equal(302);
        Item.findById(item._id, function(err, i) {
          expect(i.isCompleted).to.be.ok;
          done();
        });
      });
    });
  });
});
