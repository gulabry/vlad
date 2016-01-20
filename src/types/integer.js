var number = require('./number').property;

var integer = number.extend();
integer._type = 'integer';

/**
 * returns a valid integer
 */
module.exports = function createInteger() {
    return integer.extend();
};
module.exports.property = integer;
