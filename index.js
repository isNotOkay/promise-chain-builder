var fs = require('fs');
var thenify = require('thenify');
fs.writeFile = thenify(fs.writeFile);
fs.readFile = thenify(fs.readFile);

exports.PromiseChainBuilder = PromiseChainBuilder;

function PromiseChainBuilder(nameOfFirstFunction) {
    this.source = nameOfFirstFunction;
}

PromiseChainBuilder.prototype = (function () {
    function push(func) {
        // remove closing bracket ');' from end of chain
        this.source = this.source.slice(0, this.source - 2);
        this.source += func;
        this.source += ');';
        return this;
    }

    function cut() {
   
    }

    function size() {
        return (source.match(/\.then\(\.*\)/g) || []).length;
    }


    // public methods
    return {
        push: push,
        cut: cut,
        size: size
    }
})();






var src1 = 'a.then();';
var src2 = 'a.then().then();';
var src3 = 'a.then().then().then();';
var src4 = 'a().then();';
var nodes = [];


fs.readFile('../templates/promise_chain.js').then(function (res) {
    return fs.writeFile('../templates/output', 'lalfdfala', 'UTF-8');
}).then(function () {
    console.log('lala');
});
















