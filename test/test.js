var expect = require('chai').expect;
var PromiseChainBuilder = require('../index');

/*
 Example Functions to be chained
 */

function noParamFunc() {

}

function singleParamFunc(x) {

}

function trippleParamFunc(x, y, z) {

}

function a(x, y) {

}

function b(res) {

}

function c(res) {

}

describe('Promise Chain', function() {
    it('should throw an error indicating that the parameter is not an array', function() {
        function emptyConstructorFunction() {
            PromiseChainBuilder({});
        }

        expect(emptyConstructorFunction).to.throw();
    });

    it('should have length of 1', function() {
        var promiseChainBuilder = new PromiseChainBuilder([a]);
        expect(promiseChainBuilder.size()).to.equal(1);
    });

    it('should have length of 2', function() {
        var promiseChainBuilder = new PromiseChainBuilder([a]);
        promiseChainBuilder.push(b);
        expect(promiseChainBuilder.size()).to.equal(2);
    });

    it('should have length of 3', function() {
        var promiseChainBuilder = new PromiseChainBuilder([a]);
        promiseChainBuilder.push(b).push(c);
        expect(promiseChainBuilder.size()).to.equal(3);
    });


    it('should have length of 2', function() {
        var promiseChainBuilder = new PromiseChainBuilder([a]);
        promiseChainBuilder.push(b).push(c).cut(1);
        expect(promiseChainBuilder.size()).to.equal(2);
    });

    it('should produce correct source code chain with one element and custom catch-Function', function() {
        var promiseChainBuilder = new PromiseChainBuilder([singleParamFunc]);
        promiseChainBuilder.setCatch(function customCatchFunc(someError) {});
        expect(promiseChainBuilder.source()).to.match(/singleParamFunc\(param1\)\.then\(function\(res\) {[\s]*?}\).catch\(function customCatchFunc\(someError\) {[\s]*?}\);/);
    });

    it('should produce correct source code chain with no elements', function() {
        var promiseChainBuilder = new PromiseChainBuilder();
        expect(promiseChainBuilder.source()).to.equal('');
    });

    it('should produce correct source code for chain consisting of single function a with no parameters', function() {
        var promiseChainBuilder = new PromiseChainBuilder([noParamFunc]);
        expect(promiseChainBuilder.source()).to.match(/noParamFunc\(\)\.then\(function\(res\) {[\s]*?}\).catch\(function \(error\) {[\s]*?}\);/);
    });

    it('should produce correct source code for chain consisting of single function a with one parameter', function() {
        var promiseChainBuilder = new PromiseChainBuilder([singleParamFunc]);
        expect(promiseChainBuilder.source()).to.match(/singleParamFunc\(param1\)\.then\(function\(res\) {[\s]*?}\).catch\(function \(error\) {}\);/);
    });

    it('should produce correct source code for chain consisting of single function a with three parameters', function() {
        var promiseChainBuilder = new PromiseChainBuilder([trippleParamFunc]);
        expect(promiseChainBuilder.source()).to.match(/trippleParamFunc\(param1,param2,param3\)\.then\(function\(res\) {[\s]*?}\).catch\(function \(error\) {}\);/);
    });

    it('should produce correct source code for chain consisting of single function a with two parameters', function() {
        var promiseChainBuilder = new PromiseChainBuilder([a]);
        expect(promiseChainBuilder.source()).to.match(/a\(param1,param2\)\.then\(function\(res\) {[\s]*?}\).catch\(function \(error\) {}\);/);
    });

    it('should produce correct source code for chain consisting of functions a and b after c has been previously cut', function() {
        var promiseChainBuilder = new PromiseChainBuilder([a]);
        promiseChainBuilder.push(b).push(c);
        expect(promiseChainBuilder.source()).to.match(/a\(param1,param2\)\.then\(function b\(res\) {[\s]*?}\).then\(function c\(res\) {[\s]*?}\).catch\(function \(error\) {}\);/);
        promiseChainBuilder.cut(1);
        expect(promiseChainBuilder.source()).to.match(/a\(param1,param2\)\.then\(function b\(res\) {[\s]*?}\).catch\(function \(error\) {}\);/);
    });

    it('should produce correct source code for chain consisting of functions a, b and c', function() {
        var promiseChainBuilder = new PromiseChainBuilder([a]);
        promiseChainBuilder.push(b).push(c);
        expect(promiseChainBuilder.source()).to.match(/a\(param1,param2\)\.then\(function b\(res\) {[\s]*?}\).then\(function c\(res\) {[\s]*?}\).catch\(function \(error\) {}\);/);
    });

    it('should produce correct source code for chain consisting of functions a and b', function() {
        var promiseChainBuilder = new PromiseChainBuilder([a]);
        promiseChainBuilder.push(b);
        expect(promiseChainBuilder.source()).to.match(/a\(param1,param2\)\.then\(function b\(res\) {[\s]*?}\).catch\(function \(error\) {}\);/);
    });

    it('should throw an error indicating that chains must consist of at least one function', function() {
        var promiseChainBuilder = new PromiseChainBuilder([a]);

        function cuttingTooManySegments() {
            promiseChainBuilder.cut(1);
        }

        expect(promiseChainBuilder.size()).to.equal(1);
        expect(cuttingTooManySegments).to.throw();
    });

    it('pushing a object should throw an error indicating that only function-objects can be added to the chain', function() {
        var promiseChainBuilder = new PromiseChainBuilder();

        function pushObject() {
            promiseChainBuilder.push({});
        }
        expect(pushObject).to.throw();
    });

    it('passing no argument to push should throw an error indicating that only function-objects can be added to the chain', function() {
        var promiseChainBuilder = new PromiseChainBuilder();

        function pushObject() {
            promiseChainBuilder.push();
        }
        expect(pushObject).to.throw();
    });
});
