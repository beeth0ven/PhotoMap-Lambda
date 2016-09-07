// ------------ PhotoDidChange ------------

var Rx = require('rx');
var RxAWS = require('../rxAWS/rxAWS.js');
var PhotoMapS3 = require('../photoMap/photoMap.js');
var photoMapS3 = new PhotoMapS3.S3()
var UserInfo = require('../models/userInfo.js');

exports.handler = function(event, context) {

  console.log(JSON.stringify(event, null, 2));
  var rx_recordDidChanges = event.Records.map(record => rx_recordDidChange(record))

  RxAWS.observableGroup(rx_recordDidChanges)
    .subscribe(
      function (x)      { RxAWS.handleSucceed(x, context)  },
      function (error)  { RxAWS.handleError(error, context) },
      function ()       { RxAWS.handleDone(context) }
    );
};

function rx_recordDidChange(record) {
  switch (record.eventName) {
    case RxAWS.Insert:
    return rx_photoDidInsert(record)
      break;

    case RxAWS.Remove:
    return rx_photoDidDelete(record)
      break;

    default:
    return Rx.Observable.just({});
      break;
  }
}

function rx_photoDidInsert(record) {
  console.log('Index rx_photoDidInsert');
  var userUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.NewImage.userReference.S)
  return userUpdater.rx_increasePostedCount()
};

function rx_photoDidDelete(record) {
  console.log('Index rx_photoDidDelete');
  var userUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.OldImage.userReference.S)
  var rx_decreasePostedCount = userUpdater.rx_decreasePostedCount()
  var rx_deleteThumbnailImageS3Object = photoMapS3.rx_deleteS3Object(record.dynamodb.OldImage.thumbnailImageS3Key.S)
  var rx_deleteImageS3Object = photoMapS3.rx_deleteS3Object(record.dynamodb.OldImage.imageS3Key.S)
  return RxAWS.observableGroup([
    rx_decreasePostedCount,
    rx_deleteThumbnailImageS3Object,
    rx_deleteImageS3Object
  ])
};
