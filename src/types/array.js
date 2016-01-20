var e = require('../errors'),
    Promise = require('bluebird'),
    util = require('../util'),
    property = require('../property');

var array = property.extend();
array._type = 'array';

/**
 * Will validate an array for proper value.
 * @param {Array}
 * @return {Promise}
 */

array.validate = function(array) {
    if (!Array.isArray(array))
        throw e.FieldValidationError("Not an array.");

    if (this._min !== undefined && array.length < this._min)
        throw e.FieldValidationError("Array too short.");

    if (this._max !== undefined && array.length > this._max)
        throw e.FieldValidationError("Array too long.");

    var validator = this._validator || Promise.resolve;

    /** If passed array is > 1 and an array object, then place values in array and return it. If 
    * a value inside the array is not a type you understand, then place the error in that index of the
    * new array */

    return Promise.settle(array.map(validator))
        .then(function(results) {
            var errored = false,
                success = [],
                errors = [];

            results.forEach(function(result, i) {
                if (result.isRejected()) {
                    errored = true;
                    errors[i] = result.reason();
                } else {
                    success[i] = result.value();
                }
            });

            /** Return the error on the valid array */
            return errored ?
                Promise.reject(new e.ArrayValidationError("Invalid array items", errors)) :
                Promise.resolve(array);
        });
};

/** Take the prototype of this (array you made above) and create setters for all the values in it */
util.defineSetters(array, {

    of: function(validator) {
        if (validator instanceof property.Property) {
            this._validator = require('../vlad')(validator);
        } else if (typeof validator === 'function') {
            this._validator = validator;
        } else {
            throw e.SchemaFormatError("array.of(validator) must be passed a vlad property or function.");
        }
    },

    // aliases
    minLength: function(min) {
        this._min = min;
    },
    min: function(min) {
        this._min = min;
    },

    // aliases
    maxLength: function(max) {
        this._max = max;
    },
    max: function(max) {
        this._max = max;
    }

});

module.exports = function createArray() {
    return array.extend();
};
module.exports.property = array;
