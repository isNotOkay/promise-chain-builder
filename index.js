module.exports = PromiseChainBuilder;

function PromiseChainBuilder(fns) {
    if (!fns) {
        this.functions = [];
    } else if (Array.isArray(fns)) {
        this.functions = fns;
    } else {
        throw new Error("parameter must be an array");
    }
};

PromiseChainBuilder.prototype = (function () {

    /**
     * Use call signature of first function at the beggining of the chain and
     * concat all other functions wrapped in a 'then'-Block.
     * */
    function build(functions) {
        if (functions.length === 0) return '';
        
        // call signature for first function
        var source = functions[0].name + '(';
        for (var i = 0; i < functions[0].length; i++) {
            source += ('param' + (i + 1) + ',');
            // remove last comma in call signature
            if (i === functions[0].length - 1)
                source = source.slice(0, -1);
        }
        source += ')';

        // nothing to concat => concat anonymous function
        if (functions.length === 1) {
            source += '.then(function(res) {})';
        }
        else {
            for (var i = 1; i < functions.length; i++) {
                source += '.then(' + functions[i] + ')';
            }
        }
        source += ';';
        return source;
    }

    function push(func) {
        this.functions.push(func);
        return this;
    }

    function cut(numSegments) {
        if ((this.size() - numSegments) < 1) throw new Error('Cannot cut ' + numSegments + ' segments. Promise Chains must consist of at least one function.');
        this.functions = this.functions.slice(0, this.functions.length - numSegments);
        return this;
    }

    function size() {
        // plus one for function at the beginning of the chain
        return this.functions.length;
    }

    function source() {
        return build(this.functions);
    }


    // public methods
    return {
        push: push,
        cut: cut,
        size: size,
        source: source
    }
})();
