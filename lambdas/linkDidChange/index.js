// ------------ LinkDidChange ------------

var Rx = require('rx');
var RxAWS = require('./rxAWS/rxAWS.js');
var rxSNS = new RxAWS.RxSNS();

var UserInfo = require('./models/userInfo.js');
var Photo = require('./models/photo.js');
var Link = require('./models/link.js');

exports.handler = function(event, context) {

  // console.log(JSON.stringify(event, null, 2));
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
    return rx_linkDidInsert(record)
      break;

    case RxAWS.Remove:
    return rx_linkDidDelete(record)
      break;

    default:
    return Rx.Observable.just({});
      break;
  }
}

function rx_linkDidInsert(record) {

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

function rx_linkDidDelete(record) {

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
};

function rx_commentDidInsert(record) {
  console.log('Index commentDidInsert');
  var photoUpdater = new Photo.PhotoUpdater(record.dynamodb.NewImage.itemReference.S)
  var rx_increaseCommentCount = photoUpdater.rx_increaseCommentCount()

  var rx_toUserInfo = UserInfo.rx_getFromReference(record.dynamodb.NewImage.toUserReference.S)
  var rx_fromUserInfo = UserInfo.rx_getFromReference(record.dynamodb.NewImage.fromUserReference.S)
  var rx_photo = Photo.rx_getFromReference(record.dynamodb.NewImage.itemReference.S)
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
  console.log('Index commentDidDelete');
  var photoUpdater = new Photo.PhotoUpdater(record.dynamodb.OldImage.itemReference.S)
  return photoUpdater.rx_decreaseCommentCount()
}

function rx_likePhotoLinkDidInsert(record) {
  console.log('Index likePhotoLinkDidInsert');

  var photoUpdater = new Photo.PhotoUpdater(record.dynamodb.NewImage.itemReference.S)
  var fromUserUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.NewImage.fromUserReference.S)
  var rx_increasePhotoLikedCount = photoUpdater.rx_increaseLikedCount()
  var rx_increaseFromUserLikedCount = fromUserUpdater.rx_increaseLikedCount()

  var rx_toUserInfo = UserInfo.rx_getFromReference(record.dynamodb.NewImage.toUserReference.S)
  var rx_fromUserInfo = UserInfo.rx_getFromReference(record.dynamodb.NewImage.fromUserReference.S)
  var rx_photo = Photo.rx_getFromReference(record.dynamodb.NewImage.itemReference.S)
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
  console.log('Index likePhotoLinkDidDelete');
  var photoUpdater = new Photo.PhotoUpdater(record.dynamodb.OldImage.itemReference.S)
  var fromUserUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.OldImage.fromUserReference.S)
  return photoUpdater.rx_decreaseLikedCount()
    .flatMap (function (data) {
        return fromUserUpdater.rx_decreaseLikedCount()
    })
}

function rx_followUserLinkDidInsert(record) {
  console.log('Index followUserLinkDidInsert');
  var fromUserUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.NewImage.fromUserReference.S)
  var toUserUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.NewImage.toUserReference.S)
  var rx_increaseFromUserFollowCount = fromUserUpdater.rx_increaseFollowCount()
  var rx_increaseToUserFollowerCount = toUserUpdater.rx_increaseFollowerCount()

  var rx_toUserInfo = UserInfo.rx_getFromReference(record.dynamodb.NewImage.toUserReference.S)
  var rx_fromUserInfo = UserInfo.rx_getFromReference(record.dynamodb.NewImage.fromUserReference.S)
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
  console.log('Index followUserLinkDidDelete');
  var fromUserUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.OldImage.fromUserReference.S)
  var toUserUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.OldImage.toUserReference.S)
  return fromUserUpdater.rx_decreaseFollowCount()
    .flatMap (function (data) {
        return toUserUpdater.rx_decreaseFollowerCount()
    })
}
