var _ = require('lodash');
var fs = require('fs');

exports.containsOnlyFunctionObjects = containsOnlyFunctionObjects;
exports.extractFunctionSignature = extractFunctionSignature;
exports.writeToFile = writeToFile;

function containsOnlyFunctionObjects(arr) {
    return arr.filter(function(elem) {
        return !_.isFunction(elem);
    }).length == 0;
}

function extractFunctionSignature(func) {
    var src = func.toString().replace(/{[\s\S]*}/, '').replace('function', '').trim();
    return src;
}

function writeToFile(fileName, source) {
    fs.writeFile(fileName, source, function(err) {
        if (err) return console.log(err);
    });
}
