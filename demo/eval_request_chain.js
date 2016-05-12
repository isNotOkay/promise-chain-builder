/*
 Build dynamic promise chain consisting of GET-requests at runtime and execute code using 'eval'
 **/
var request = require('request-promise');
var PromiseChainBuilder = require('../index');

var options = {
    resolveWithFullResponse: true
};

// === functions to be chained ===
function getGoogle() {
    options.uri = 'http://www.google.de';
    return request(options);
}

function getWikipedia(res) {
    console.log('// status code of previous GET-request: ' + res.statusCode);
    options.uri = 'http://www.wikipedia.org';
    return request(options);
}

function getReddit(res) {
    console.log('// status code of previous GET-request: ' + res.statusCode);
    options.uri = 'http://www.reddit.org';
    return request(options);
}

function somethingWentWrong(err) {
    console.log(err);
}

function finish(res) {
    console.log('// status code of previous GET-request: ' + res.statusCode);
}
// === functions to be chained ===

// build chain 
var promiseChainBuilder = new PromiseChainBuilder([getGoogle, getWikipedia, getReddit, finish]);
promiseChainBuilder.setCatch(somethingWentWrong);
var source = promiseChainBuilder.source();
console.log(source);

// execute chain 
eval(source);
