// ------------ LinkRecord ------------

exports.KindFollowUser = "0";
exports.KindLikePhoto = "1";
exports.KindCommentPhoto = "2";

var RxAWS = require('../rxAWS/rxAWS.js');
var rxDynamodb = new RxAWS.RxDynamoDB();
var UserInfo = require('./userInfo.js');
var Photo = require('./photo.js');

function LinkRecord(record) {

  this.record = record;

  this.getRecordImage = function () {
    var newImage = this.record.dynamodb.NewImage
    var oldImage = this.record.dynamodb.OldImage
    return newImage != null ? newImage : oldImage
  }

  this.getFromUserUpdater = function () {
    var fromUserReference =  this.getRecordImage().fromUserReference.S
    return new UserInfo.UserInfoUpdater(fromUserReference)
  }

  this.getToUserUpdater = function () {
    var toUserReference =  this.getRecordImage().toUserReference.S
    return new UserInfo.UserInfoUpdater(toUserReference)
  }

  this.getPhotoUpdater = function () {
    var photoReference =  this.getRecordImage().itemReference.S
    return new Photo.PhotoUpdater(photoReference)
  }

  this.rx_increaseCommentCountToPhoto = function () {
    console.log('LinkRecord rx_increaseCommentCountToPhoto');
    return this.getPhotoUpdater().rx_increaseCommentCount()
  }

  this.rx_decreaseCommentCountToPhoto = function () {
    console.log('LinkRecord rx_decreaseCommentCountToPhoto');
    return this.getPhotoUpdater().rx_decreaseCommentCount()
  }

  this.rx_increaseLikeCount = function () {
    console.log('LinkRecord rx_increaseLikeCountToPhoto');
    var photoUpdater = this.getPhotoUpdater()
    var fromUserUpdater = this.getFromUserUpdater()
    return photoUpdater.rx_increaseLikeCount()
    .flatMap (function (data) {
        return fromUserUpdater.rx_increaseLikedCount()
    })
  }

  this.rx_decreaseLikeCount = function () {
    console.log('LinkRecord rx_decreaseLikeCountToPhoto');
    var photoUpdater = this.getPhotoUpdater()
    var fromUserUpdater = this.getFromUserUpdater()
    return photoUpdater.rx_decreaseLikeCount()
    .flatMap (function (data) {
        return fromUserUpdater.rx_decreaseLikedCount()
    })
  }

  this.rx_increaseFollowAndFollowerCount = function () {
    console.log('LinkRecord rx_increaseFollowAndFollowerCount');
    var fromUserUpdater = this.getFromUserUpdater()
    var toUserUpdater = this.getToUserUpdater()
    return fromUserUpdater.rx_increaseFollowCount()
      .flatMap (function (data) {
          return toUserUpdater.rx_increaseFollowerCount()
      })
  }

  this.rx_decreaseFollowAndFollowerCount = function () {
    console.log('LinkRecord rx_decreaseFollowAndFollowerCount');
    var fromUserUpdater = this.getFromUserUpdater()
    var toUserUpdater = this.getToUserUpdater()
    return fromUserUpdater.rx_decreaseFollowCount()
    .flatMap (function (data) {
        return toUserUpdater.rx_decreaseFollowerCount()
    })
  }

};

exports.LinkRecord = LinkRecord;
