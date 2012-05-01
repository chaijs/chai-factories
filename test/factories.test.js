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
    chai.expect(chai).to.respondTo('Factory');
  });
});
