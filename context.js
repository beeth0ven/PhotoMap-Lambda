function Context() {

  this.succeed = function (object) {
    // console.log('Context' ,object);
  };

  this.fail = function (error) {
    // console.log('Context' ,error);
  };

  this.done = function () {
    // console.log('Context done!');
  };
}

// ------------ Testing ------------

var Index = require('./index.js');
var Event = require('./models/event.js');

var context = new Context();

Index.handler(Event.deletePhotoEvent, context)

// ------------ Testing RxDynamoDB ------------

// var RxAWS = require('./rxAWS/rxAWS.js');
//
// var rxDynamodb = new RxAWS.RxDynamoDB();
// var UserInfo = require('./models/userInfo.js');
//
// var params = {
//   'Key': {
//       "creationTime": {
//         "N": "1471330612.177063"
//       },
//       "userReference": {
//         "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
//       }
//     },
//   'TableName': 'photomap-mobilehub-567053031-Photo',
//   'AttributeUpdates': {}
// };
//
// var updateParams = new RxAWS.RxDynamoDBUpdateParams(params)
// updateParams.addNumberForKey(1, 'likesNumber')
// console.log(updateParams.params);
