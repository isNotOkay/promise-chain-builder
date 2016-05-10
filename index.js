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

    function source() {
        var i;

        if (this.functions.length === 0) return '';

        /**
         * Use call signature of first function at the beggining of the chain and
         * concat all other functions wrapped in a 'then'-Block.
         * */
        var source = this.functions[0].name + '(';
        for (i = 0; i < this.functions[0].length; i++) {
            source += ('param' + (i + 1) + ',');
            // remove last comma in call signature
            if (i === this.functions[0].length - 1)
                source = source.slice(0, -1);
        }
        source += ')';

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
