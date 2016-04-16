var fs = require('fs');
var thenify = require('thenify');
fs.writeFile = thenify(fs.writeFile);
fs.readFile = thenify(fs.readFile);


function b() {
    console.log('lala');
}

function c() {
    console.log('lolo');
}
function d() {
    console.log('lili');
}

var PromiseChainBuilder = require('../index.js');
console.log(PromiseChainBuilder.toString());

var promiseChain = new PromiseChainBuilder('a');

promiseChain.push(b).push(c).push(d);
promiseChain.cut(3);
console.log(promiseChain.source());

console.log(promiseChain.functions);
