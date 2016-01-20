var e = require('../errors'),
    Promise = require('bluebird'),
    util = require('../util'),
    property = require('../property');

var date = property.extend();
date._type = 'date';


/**
 * returns the date object, makes a new date object if it's not passed one
 */
date.parse = function(date) {
    if ( !(date instanceof Date) ) {
        date = new Date(date);
    }
    if (date.getTime() !== date.getTime()) return NaN;
    return date;
}

/**
 * returns the date object if there isn't a valid date
 */
date.validate = function(date) {
    if (date !== date) throw e.FieldValidationError("Not a valid date.");
    return date;
}

module.exports = function createDate() {
    return date.extend();
}
module.exports.property = date;
