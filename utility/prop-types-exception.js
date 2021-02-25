const map = require('lodash/fp/map');
const util = require('util');

function PropTypesException (errors) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.errors = errors;
  this.message = map('message')(errors).join('\n');
}
util.inherits(PropTypesException, Error);

exports = module.exports = PropTypesException;