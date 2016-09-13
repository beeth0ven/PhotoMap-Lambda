// ------------ PhotoHandler ------------

var Rx = require('rx');
var RxAWS = require('../rxAWS/rxAWS.js');
var PhotoMap = require('../photoMap/photoMap.js');
var photoMapS3 = new PhotoMap.S3()
var UserInfo = require('../models/userInfo.js');

exports.rx_recordDidInsert = function (record) {
  console.log('PhotoHandler rx_recordDidInsert');
  var userInfo = new UserInfo.UserInfo();
  userInfo.parseReference(record.dynamodb.NewImage.userReference.S)
  return userInfo.rx_increasePostedCount()
};

exports.rx_recordDidModify = function (record) {
  return Rx.Observable.just({});
}

exports.rx_recordDidDelete = function (record) {
  console.log('PhotoHandler rx_photoDidDelete');
  var userInfo = new UserInfo.UserInfo();
  userInfo.parseReference(record.dynamodb.OldImage.userReference.S)
  var rx_decreasePostedCount = userInfo.rx_decreasePostedCount()
  var rx_deleteThumbnailImageS3Object = photoMapS3.rx_deleteS3Object(record.dynamodb.OldImage.thumbnailImageS3Key.S)
  var rx_deleteImageS3Object = photoMapS3.rx_deleteS3Object(record.dynamodb.OldImage.imageS3Key.S)
  return RxAWS.observableGroup([
    rx_decreasePostedCount,
    rx_deleteThumbnailImageS3Object,
    rx_deleteImageS3Object
  ])
}
