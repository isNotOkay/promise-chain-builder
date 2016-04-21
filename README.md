# Promise-Chain-Builder

Utility to generate source code for promise chains

### Installation

```sh
$ npm install && npm run test
```

### Usage

```javascript
function a(res) {/* do something */}
function b(res) {/* do something */}
var promiseChainBuilder = new PromiseChainBuilder([a]);
console.log(promiseChainBuilder.source());
```
### Output
```javascript
a.then(function b(res) {
/* do something */
});
```