var _ = require('lodash'),
    Promise = require('bluebird');

/**
 * A property definer, used for chained syntax
 * Borrowed from chai.js
 *
 * @param {*} ctx
 * @param {String} name
 * @param {Function} getter
 */
function defineProperty(ctx, name, getter) {
    Object.defineProperty(ctx, name, {
        get: function() {
            var result = getter.call(this);
            return result === undefined ? this : result;
        },
        configurable: true
    });
}

/**
 * Define a bunch of properties at once
 * @param {*} ctx
 * @param {Object} getters
 */
function defineProperties(ctx, getters) {
    _.each(getters, function(getter, name) {
        defineProperty(ctx, name, getter);
    });
}

/**
 * Map an objects keys while maintaining values
 * If returned value is undefined, does not add key/value pair
 *
 * @param {Object} ctx
 * @param {Function} fn
 * @return {Object}
 */
function keyMap(ctx, fn) {
    var obj = {};
    for(key in ctx) {
        var value = ctx[key],
            newKey = fn(value, key);

        if (newKey !== undefined) obj[newKey] = value;
    }
    return obj;
}

/**
 * Resolve an object of promises
 * @param {Object} obj
 * @return {Promise}
 */
function resolveObject(obj) {
    var values = _.values(obj),
        keys = _.keys(obj);

    return Promise.settle(values).then(function(results) {
        var rejected = {},
            resolved = {},
            success = true;

        // go over each promsei
        _.each(results, function(result, i) {

            // if we haven't given up yet, add to resolved map
            if (success && result.isFulfilled()) {
                resolved[keys[i]] = result.value();
            }

            // rejected add to rejected map and set success flag to false
            if (result.isRejected()) {
                success = false;
                rejected[keys[i]] = result.reason();
            }
        });

        return success ? Promise.resolve(resolved) : Promise.reject(rejected);
    });
}


module.exports = {
    defineProperty: defineProperty,
    defineProperties: defineProperties,
    keyMap: keyMap,
    resolveObject: resolveObject
}
