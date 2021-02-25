const compact = require('lodash/fp/compact');
const flow = require('lodash/fp/flow');
const isFunction = require('lodash/fp/isFunction');
const map = require('lodash/fp/map');
const mapWithKey = map.convert({ cap: false });
const ObjectId = require('mongoose').Types.ObjectId;
const PropTypes = require('prop-types');
const PropTypesException = require('./prop-types-exception');


function createObjectIdPropType (isObject, isRequired) {
  return (props, propName, componentName) => {
    const prop = props[propName];
    if (isRequired && !prop) {
      return new Error(`Prop '${propName}' was not supplied to '${componentName}' and is required.`);
    } else if (prop) {
      if (isObject) {
        if (prop.constructor.name !== 'ObjectID') {
          return new Error(`Invalid prop '${propName}' supplied to '${componentName}'. Expecting an ObjectId. Received: ${JSON.stringify(prop)}`);
        }
      } else if (prop.constructor.name !== 'String' || !ObjectId.isValid(prop)) {
        return new Error(`Invalid prop '${propName}' supplied to '${componentName}'. Expecting a string of 12 bytes or a string of 24 hex characters. Received: ${JSON.stringify(prop)}`);
      }
    }
    return null;
  };
}


const objectIdPropType = {
  object: createObjectIdPropType(true, false),
  string: createObjectIdPropType(false, false),
};
objectIdPropType.object.isRequired = createObjectIdPropType(true, true);
objectIdPropType.string.isRequired = createObjectIdPropType(false, true);
PropTypes.objectId = objectIdPropType;


PropTypes.checkPropTypes = function (typeSpecs, props, location, componentName) {
  const errors = flow(
    mapWithKey((f, propName) => {
      if (!isFunction(f)) console.log(`Prop "${propName}" does not have a function as a type.`);
      return f(props, propName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
    }),
    compact,
  )(typeSpecs);
  if (errors.length) throw new PropTypesException(errors);
};


module.exports = PropTypes;