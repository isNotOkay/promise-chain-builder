'use strict';


var falafel = require('falafel');
var fsp = require('fs-promise');


fsp.readFile('./templates/before-block.js', 'utf8').then(function(res){
    console.log(res);
});



