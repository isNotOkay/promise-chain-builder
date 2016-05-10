var _ = require('lodash');

exports.containsOnlyFunctionObjects = containsOnlyFunctionObjects;
exports.extractFunctionSignature = extractFunctionSignature;

function containsOnlyFunctionObjects(arr) {
    return arr.filter(function(elem) {
        return !_.isFunction(elem);
    }).length == 0;
}

function extractFunctionSignature(func) {
    var src = func.toString().replace(/{[\s\S]*}/,'').replace('function','').trim();
    return src;
}

