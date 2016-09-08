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

// Index.handler(Event.photoDidInsert, context)

var Rx = require('rx');
var RxAWS = require('./rxAWS/rxAWS.js');
// var PhotoMap = require('./photoMap/photoMap.js');
// var rxSNS = new RxAWS.RxSNS();
// var rxDynamodb = new RxAWS.RxDynamoDB();
// var UserInfo = require('./models/userInfo.js');
var DynamoDBModel = require('./rxAWS/dynamoDBModel.js');

var dynamoDBModel = new DynamoDBModel.DynamoDBModel()
dynamoDBModel.parseReference("[\"[\\\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\\\",1471233536.58108]\",1471238430.666237]")
console.log(dynamoDBModel.getParams());

// var params = {
//   TableName : 'photomap-mobilehub-567053031-Link',
//   Key: {
//     creationTime: 1472020821.410142,
//     fromUserReference: '["us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2",1471233536.58108]'
//   },
//   AttributeUpdates: {
//     postedNumber: {
//       Action: 'ADD',
//       Value: 1
//     }
//   }
// }
//
// var rxDynamodb = new RxAWS.RxDynamoDB();
//
// rxDynamodb.rx_updateItem(params)
//   .subscribe(
//     function (x)      { RxAWS.handleSucceed(x, context)  },
//     function (error)  { RxAWS.handleError(error, context) },
//     function ()       { RxAWS.handleDone(context) }
//   );
