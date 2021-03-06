var e = require('../errors'),
    Promise = require('bluebird'),
    util = require('../util'),
    property = require('../property');

var boolean = property.extend();
boolean._type = 'boolean';


/**
 * Checks and throws validation error if value is not true or false
 */
boolean.parse = function(value) {
    switch(typeof value) {
        case 'boolean': return value;
        case 'string':
            if (value === 'true') return true;
            if (value === 'false') return false;
            break;
    }

    throw new e.FieldValidationError(value + " is not true or false.")
}


/**
 * Return an object with this as a prototype
 * @return boolean
 */
boolean.validate = function(value) {
    if (typeof value !== 'boolean')
        throw e.FieldValidationError("Not true or false.");

    return value;
};

module.exports = function createBoolean() {
    return boolean.extend();
};
module.exports.property = boolean;
