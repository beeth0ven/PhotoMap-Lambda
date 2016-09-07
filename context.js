function Context() {
  this.succeed = function (object) {}
  this.fail = function (error) {}
  this.done = function () {}
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

// var params = {
//     RequestItems: {
//         "photomap-mobilehub-567053031-Link": [
//             {
//                 DeleteRequest: {
//                     Key: {
//                         "creationTime": {
//                             "N": "1473215505.247843"
//                         },
//                         "fromUserReference": {
//                             "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
//                         }
//                     }
//                 }
//             },
//             {
//                 DeleteRequest: {
//                     Key: {
//                         "creationTime": {
//                             "N": "1471940206.653447"
//                         },
//                         "fromUserReference": {
//                             "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
//                         }
//                     }
//                 }
//             }
//         ]
//     }
// }
//
// rxDynamodb.rx_batchWriteItem(params)
//   .subscribe(
//     function (x)      { RxAWS.handleSucceed(x, context)  },
//     function (error)  { RxAWS.handleError(error, context) },
//     function ()       { RxAWS.handleDone(context) }
//   );
