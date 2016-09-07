// ------------ Index ------------

var LinkDidChangeIndex = require('./indexes/linkDidChangeIndex.js');
var PhotoDidChangeIndex = require('./indexes/photoDidChangeIndex.js');
var UserInfoDidChangeIndex = require('./indexes/userInfoDidChangeIndex.js');

exports.handler = PhotoDidChangeIndex.handler
