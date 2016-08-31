var Rx = require('rx');
var RxAWS = require('./rxAWS/rxAWS.js');
var UserInfo = require('./models/userInfo.js');
var Photo = require('./models/photo.js');

exports.handler = function(event, context) {

  console.log(JSON.stringify(event, null, 2));

  event.Records.forEach(function(record) {

      switch (record.eventName) {
        case RxAWS.Insert:
        photoDidInsert(record, context);
          break;

        case RxAWS.Remove:
        photoDidDelete(record, context);
          break;

        default:
        context.done();
          break;
      }
  });
};

function photoDidInsert(record, context) {
  console.log('Index photoDidInsert');
    var userUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.NewImage.userReference.S)
    userUpdater.rx_increasePostedCount()
      .subscribe(
        function (x)      { RxAWS.handleSucceed("photoDidInsert", context)  },
        function (error)  { RxAWS.handleError(error, context) },
        function ()       { RxAWS.handleDone(context) }
      );
};

function photoDidDelete(record, context) {
  console.log('Index photoDidDelete');
  var userUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.OldImage.userReference.S)
  userUpdater.rx_decreasePostedCount()
    .subscribe(
      function (x)      { RxAWS.handleSucceed("photoDidDelete", context)  },
      function (error)  { RxAWS.handleError(error, context) },
      function ()       { RxAWS.handleDone(context) }
    );
};
