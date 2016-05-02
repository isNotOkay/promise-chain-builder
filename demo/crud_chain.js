var PromiseChainBuilder = require('../index.js');

/*
 * Example functions to build a promise chain that simulates CRUD
 **/

function createEntity(data) {
    // ... insert code to create entity ...
    var newResult = {};
    return newResult;
}

function readEntity(res) {
    // ... insert code to read entity ...
    var newResult = {};
    return newResult;
}

function updateEntity(res) {
    // ... insert code to update entity ...
    var newResult = {};
    return newResult;
}

function deleteEntity(res) {
    // ... insert code to delete entity ...
}

/*
 * Build the actual chain by passing an array containing references to the CRUD-functions above
 **/
var promiseChainBuilder = new PromiseChainBuilder([createEntity, readEntity, updateEntity, deleteEntity]);
var generatedSource = promiseChainBuilder.source();
