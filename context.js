function Context() {
  this.succeed = function (object) {}
  this.fail = function (error) {}
  this.done = function () {}
}

// ------------ Testing ------------

var Index = require('./index.js');
var Event = require('./models/event.js');

var context = new Context();

Index.handler(Event.followUserLinkDidDelete, context)

// var Rx = require('rx');
// var RxAWS = require('./rxAWS/rxAWS.js');
// var rxSNS = new RxAWS.RxSNS();
// var rxDynamodb = new RxAWS.RxDynamoDB();
// var UserInfo = require('./models/userInfo.js');
