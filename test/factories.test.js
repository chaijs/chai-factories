/*!
 * chai-null :: Factories over fixtures
 *
 * Chai.js Team - http://chaijs.com/
 * Copyright (c) 2012 Veselin Todorov <hi@vesln.com>
 *
 * MIT Licensed
 */

/**
 * Register the plugin.
 */
if (!chai) {
  var chai = require('chai');
  chai.use(require('..'));
};

/**
 * Support.
 */
var should = chai.should();

describe('Chai Factories', function() {
  it('attaches to chai', function() {
    chai.expect(chai).to.respondTo('factory');
    chai.expect(chai).to.respondTo('create');
  });

  it('can register a factory', function() {
    chai.factory('user', { foo: 3, bar: true, });
    chai.create('user').should.eql({ foo: 3, bar: true});
  });

  it('can create independant factories', function() {
    chai.factory('user', { foo: 3, bar: true, });

    var first = chai.create('user');
    var second = chai.create('user');
    first.foo = 5;

    second.foo.should.eql(3);
  });

  it('can overwrite properties when creating factories', function() {
    chai.factory('user', { foo: 3, bar: true, });
    chai.create('user', { foo: 4 }).should.eql({ foo: 4, bar: true});
  });

  it('throws an error if requested factory is not registered', function() {
    (function() {
      chai.create('unregistered');
    }).should.throw();
  });

  describe('Factory', function() {
    it('is extendable', function() {
      var factory = chai.factory('user', { foo: 3, bar: true, });
      chai.factory('admin', factory.extend({ bar: false}));

      chai.create('admin').should.eql({ foo: 3, bar: false});
    });
  });
});
