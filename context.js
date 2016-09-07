// function Context() {
//   this.succeed = function (object) {}
//   this.fail = function (error) {}
//   this.done = function () {}
// }

class Context {
  succeed(object) { }
  fail(error) { }
  done() { }
}

// ------------ Testing ------------

var Index = require('./index.js');
var Event = require('./models/event.js');

var context = new Context();

// Index.handler(Event.photoDidDelete, context)

// var Rx = require('rx');
// var RxAWS = require('./rxAWS/rxAWS.js');
// var PhotoMap = require('./photoMap/photoMap.js');
// var rxSNS = new RxAWS.RxSNS();
// var rxDynamodb = new RxAWS.RxDynamoDB();
// var UserInfo = require('./models/userInfo.js');

var AWS = require('aws-sdk');
AWS.config.loadFromPath('config.json');

var params = {
  TableName : 'photomap-mobilehub-567053031-UserInfo',
  Key: {
    creationTime: 1471233536.58108,
    userId: 'us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2'
  }
};

var docClient = new AWS.DynamoDB.DocumentClient();

docClient.get(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});
