/*!
 * chai-null :: Factories over fixtures
 *
 * Chai.js Team - http://chaijs.com/
 * Copyright (c) 2012 Veselin Todorov <hi@vesln.com>
 *
 * MIT Licensed
 */

/**
 * Extends multiple objects.
 *
 * @returns {Object}
 */
function extend() {
  var arr = Array.prototype.slice.call(arguments);
  var main = arr.length === 2 ? arr.shift() : {};

  arr.forEach(function(obj) {
    for (var p in obj) {
      if (!obj.hasOwnProperty(p)) continue;
      main[p] = obj[p];
    }
  });

  return main;
};

/**
 * Collector. Store the registered factories.
 *
 * @api public
 */
function Collector() {
  this.collection = {};
};

/**
 * Register a factory.
 *
 * @param {String} name
 * @param {Factory} factory
 * @api public
 */
Collector.prototype.set = function(name, factory) {
  this.collection[name] = factory;
};

/**
 * Get a factory.
 *
 * @param {String} name
 * @returns {Factory} factory
 * @api public
 */
Collector.prototype.get = function(name) {
  return this.collection[name];
};

/**
 * Factory class.
 *
 * @param {Object} attributes
 * @api public
 */
function Factory(attributes) {
  this.attributes = attributes;
};

/**
 * Create a factory.
 *
 * @param {Object} attributes
 * @returns {Object}
 * @api public
 */
Factory.prototype.create = function(attributes) {
  return extend(extend(this.attributes), attributes);
};

/**
 * Extend a factory.
 *
 * @param {Object} attributes
 * @returns {Object}
 * @api public
 */
Factory.prototype.extend = function(attributes) {
  return this.create(attributes);
};

/**
 * Register as plugin.
 */
module.exports = function(chai, _) {
  var collector = new Collector;

  chai.factory = function(name, attributes) {
    var factory = new Factory(attributes);
    collector.set(name, factory);
    return factory;
  };

  chai.create = function(name, attributes) {
    var factory = collector.get(name);
    if (!factory) throw new Error('Unknown factory: ' + name);
    return factory.create(attributes);
  };
};
