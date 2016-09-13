// ------------ LinkHandler ------------

var Rx = require('rx');
var RxAWS = require('../rxAWS/rxAWS.js');
var rxSNS = new RxAWS.RxSNS();

var UserInfo = require('../models/userInfo.js');
var Photo = require('../models/photo.js');
var Link = require('../models/link.js');

exports.rx_recordDidInsert = function (record) {
  switch (record.dynamodb.NewImage.kindRawValue.N) {
    case Link.KindFollowUser:
    return rx_followUserLinkDidInsert(record)
      break;

    case Link.KindCommentPhoto:
    return rx_commentDidInsert(record)
      break;

    case Link.KindLikePhoto:
    return rx_likePhotoLinkDidInsert(record)
        break;

    default:
    return Rx.Observable.just({});
      break;
  };
};

exports.rx_recordDidModify = function (record) {
  return Rx.Observable.just({});
}

exports.rx_recordDidDelete = function (record) {
  switch (record.dynamodb.OldImage.kindRawValue.N) {
    case Link.KindFollowUser:
    return rx_followUserLinkDidDelete(record)
      break;

    case Link.KindCommentPhoto:
    return rx_commentDidDelete(record)
      break;

    case Link.KindLikePhoto:
    return rx_likePhotoLinkDidDelete(record)
      break;

    default:
    return Rx.Observable.just({});
      break;
  };
}

function rx_commentDidInsert(record) {
  console.log('LinkHandler commentDidInsert');
  var photo = new Photo.Photo().parseReference(record.dynamodb.NewImage.itemReference.S)
  var rx_increaseCommentCount = photo.rx_increaseCommentCount()
  var rx_toUserInfo = new UserInfo.UserInfo().rx_getFromReference(record.dynamodb.NewImage.toUserReference.S)
  var rx_fromUserInfo = new UserInfo.UserInfo().rx_getFromReference(record.dynamodb.NewImage.fromUserReference.S)
  var rx_photo = new Photo.Photo().rx_getFromReference(record.dynamodb.NewImage.itemReference.S)
  var rx_publishToTopicArn = Rx.Observable.combineLatest(
    rx_toUserInfo,
    rx_fromUserInfo,
    rx_photo,
    function (toUserInfo, fromUserInfo, photo) {
       return [fromUserInfo.displayName.S + '评论了你的照片 -- ' + photo.title.S, toUserInfo.snsTopicArn.S]
    })
    .flatMap (function (data) {
      return rxSNS.rx_publishToTopicArn(data[0], data[1])
    })

  return RxAWS.observableGroup([
    rx_increaseCommentCount,
    rx_publishToTopicArn
  ])
}

function rx_commentDidDelete(record) {
  console.log('LinkHandler commentDidDelete');
  var photo = new Photo.Photo().parseReference(record.dynamodb.OldImage.itemReference.S)
  return photo.rx_decreaseCommentCount()
}

function rx_likePhotoLinkDidInsert(record) {
  console.log('LinkHandler likePhotoLinkDidInsert');

  var photo = new Photo.Photo().parseReference(record.dynamodb.NewImage.itemReference.S)
  var fromUser = new UserInfo.UserInfo().parseReference(record.dynamodb.NewImage.fromUserReference.S)
  var rx_increasePhotoLikedCount = photo.rx_increaseLikedCount()
  var rx_increaseFromUserLikedCount = fromUser.rx_increaseLikedCount()

  var rx_toUserInfo = new UserInfo.UserInfo().rx_getFromReference(record.dynamodb.NewImage.toUserReference.S)
  var rx_fromUserInfo = new UserInfo.UserInfo().rx_getFromReference(record.dynamodb.NewImage.fromUserReference.S)
  var rx_photo = new Photo.Photo().rx_getFromReference(record.dynamodb.NewImage.itemReference.S)
  var rx_publishToTopicArn = Rx.Observable.combineLatest(
    rx_toUserInfo,
    rx_fromUserInfo,
    rx_photo,
    function (toUserInfo, fromUserInfo, photo) {
       return [fromUserInfo.displayName.S + '喜欢了你的照片 -- ' + photo.title.S, toUserInfo.snsTopicArn.S]
    })
    .flatMap (function (data) {
      return rxSNS.rx_publishToTopicArn(data[0], data[1])
    })

  return RxAWS.observableGroup([
    rx_increasePhotoLikedCount,
    rx_increaseFromUserLikedCount,
    rx_publishToTopicArn
  ])
}

function rx_likePhotoLinkDidDelete(record) {
  console.log('LinkHandler likePhotoLinkDidDelete');
  var photo = new Photo.Photo().parseReference(record.dynamodb.OldImage.itemReference.S)
  var fromUser = new UserInfo.UserInfo().parseReference(record.dynamodb.OldImage.fromUserReference.S)
  return RxAWS.observableGroup([
    photo.rx_decreaseLikedCount(),
    fromUser.rx_decreaseLikedCount()
  ])
}

function rx_followUserLinkDidInsert(record) {
  console.log('LinkHandler followUserLinkDidInsert');
  var fromUser = new UserInfo.UserInfo().parseReference(record.dynamodb.NewImage.fromUserReference.S)
  var toUser = new UserInfo.UserInfo().parseReference(record.dynamodb.NewImage.toUserReference.S)
  var rx_increaseFromUserFollowCount = fromUser.rx_increaseFollowCount()
  var rx_increaseToUserFollowerCount = toUser.rx_increaseFollowerCount()

  var rx_toUserInfo = new UserInfo.UserInfo().rx_getFromReference(record.dynamodb.NewImage.toUserReference.S)
  var rx_fromUserInfo = new UserInfo.UserInfo().rx_getFromReference(record.dynamodb.NewImage.fromUserReference.S)
  var rx_publishToTopicArn = Rx.Observable.combineLatest(
    rx_toUserInfo,
    rx_fromUserInfo,
    function (toUserInfo, fromUserInfo) {
       return [fromUserInfo.displayName.S + '正在关注你！', toUserInfo.snsTopicArn.S]
    })
    .flatMap (function (data) {
      return rxSNS.rx_publishToTopicArn(data[0], data[1])
    })

  return RxAWS.observableGroup([
    rx_increaseFromUserFollowCount,
    rx_increaseToUserFollowerCount,
    rx_publishToTopicArn
  ])
}

function rx_followUserLinkDidDelete(record) {
  console.log('LinkHandler followUserLinkDidDelete');
  var fromUser = new UserInfo.UserInfo().parseReference(record.dynamodb.OldImage.fromUserReference.S)
  var toUser = new UserInfo.UserInfo().parseReference(record.dynamodb.OldImage.toUserReference.S)
  return RxAWS.observableGroup([
    fromUser.rx_decreaseFollowCount(),
    toUser.rx_decreaseFollowerCount()
  ])
}
