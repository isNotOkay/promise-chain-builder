var _ = require('lodash');
var util = require('./util/index.js');

module.exports = PromiseChainBuilder;

function PromiseChainBuilder(fns) {
    // functions to be chained
    this.functions;
    if (!fns) this.functions = [];
    else if (Array.isArray(fns) && util.containsOnlyFunctionObjects(fns)) this.functions = fns;
    else throw new Error("parameter must be an array");

    // 'catch'-Function at end of chain
    this.catchFunc = function(error) {};
};

PromiseChainBuilder.prototype = (function() {

    function push(func) {
        if (!_.isFunction(func)) throw new Error('Either no parameter was specified or parameter is not a function');
        this.functions.push(func);
        return this;
    }

    function size() {
        // plus one for function at the beginning of the chain
        return this.functions.length;
    }

    function source(fileName) {
        var source, i;
        if (this.functions.length === 0) return '';

        source = util.extractFunctionSignature(this.functions[0]);
        // nothing to concat => concat anonymous function
        if (this.functions.length === 1) {
            source += '.then(function(res) {})';
        }
        else {
            for (i = 1; i < this.functions.length; i++) {
                source += '.then(' + this.functions[i] + ')';
            }
        }
        // append 'catch'-Function
        source += '.catch(' + this.catchFunc + ');';

        if (fileName) util.writeToFile(fileName, source);
        return source;
    }

    function setCatch(func) {
        this.catchFunc = func;
    }


    // public methods
    return {
        push: push,
        size: size,
        source: source,
        setCatch: setCatch
    }
})();
