module.exports = PromiseChainBuilder;

function PromiseChainBuilder(firstFunctionName) {
    if (!firstFunctionName) throw new Error('Cannot build promise chain without specifying name of first function');
    this.firstFunctionName = firstFunctionName;
    this.functions = [];
};

PromiseChainBuilder.prototype = (function () {

    function build(firstFunctionName, functions) {
        var source = firstFunctionName;
        for (var i = 0; i < functions.length; i++) {
            source += '.then(' + functions[i] + ')';
        }
        source += ';';
        return source;
    }

    function push(func) {
        this.functions.push(func);
        return this;
    }

    function cut(numSegments) {
        if ((this.size() - numSegments) < 2) throw new Error('Cannot cut ' + numSegments + ' segments. Promise Chains must consist of at least two functions.');
        this.functions = this.functions.slice(0, this.functions.length - numSegments);
        return this;
    }

    function size() {
        // plus one for function at the beginning of the chain
        return this.functions.length + 1;
    }

    function source() {
        return build(this.firstFunctionName, this.functions);
    }


    // public methods
    return {
        push: push,
        cut: cut,
        size: size,
        source: source
    }
})();


















