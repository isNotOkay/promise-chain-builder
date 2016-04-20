var expect = require('chai').expect;
var PromiseChainBuilder = require('../index');

/*
 Example Functions to be chained
 */

function a(res) {

}
function b(res) {

}
function c(res) {
    
}

describe('Promise Chain', function () {
    var promiseChainBuilder;

    beforeEach(function () {
        promiseChainBuilder = new PromiseChainBuilder('a');
    });

    it('should produce correct source code for chain consisting of functions a, b and c', function () {
        promiseChainBuilder.push(b).push(c);
        expect(promiseChainBuilder.source()).to.match(/a\.then\(function b\(res\) {[\s]*?}\).then\(function c\(res\) {[\s]*?}\);/);
    });

    it('should produce correct source code for chain consisting of functions a and b', function () {
        promiseChainBuilder.push(b);
        expect(promiseChainBuilder.source()).to.match(/a\.then\(function b\(res\) {[\s]*?}\);/);
    });

    it('should have length of 1', function () {
        expect(promiseChainBuilder.size()).to.equal(1);
    });

    it('should have length of 2', function () {
        promiseChainBuilder.push(b);
        expect(promiseChainBuilder.size()).to.equal(2);
    });

    it('should have length of 3', function () {
        promiseChainBuilder.push(b).push(c);
        expect(promiseChainBuilder.size()).to.equal(3);
    });


    it('should have length of 2', function () {
        promiseChainBuilder.push(b).push(c).cut(1);
        expect(promiseChainBuilder.size()).to.equal(2);
    });

    it('should throw an error indicating that chains must consist of at least two functions', function () {
        function cuttingTooManySegments() {
            promiseChainBuilder.push(b).cut(1);
        }

        expect(cuttingTooManySegments).to.throw();
    });

    it('should throw an error indicating that the name of the first function is needed to initialize the builder', function () {
        function emptyConstructorFunction() {
            PromiseChainBuilder();
        }

        expect(emptyConstructorFunction).to.throw();
    });
});
