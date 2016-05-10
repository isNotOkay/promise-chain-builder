var _ = require('lodash');

exports.containsOnlyFunctionObjects = containsOnlyFunctionObjects;

function containsOnlyFunctionObjects(arr) {
    return arr.filter(function(elem) {
        return !_.isFunction(elem);
    }).length == 0;
}