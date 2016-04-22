# Promise-Chain-Builder

Utility to generate source code for promise chains
### Usage

```javascript
var PromiseChainBuilder = require('PromiseChainBuilder');
function a(res) {/* do something */}
function b(res) {/* do something */}

var promiseChainBuilder = new PromiseChainBuilder([a,b]);
console.log(promiseChainBuilder.source());
```
#### Output
```javascript
a.then(function b(res) {
/* do something */
});
```

### API 
#### promiseBuilder.push(func);
Appends a function wrapped in a 'then'-block.

#### promiseBuilder.cut(numFunctions);
Removes functions from end of chain.

#### promiseBuilder.size();
Returns number of chained functions.

#### promiseBuilder.source();
Returns generated source code.