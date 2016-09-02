// ------------ LinkDidChange ------------

var Rx = require('rx');
var RxAWS = require('./rxAWS/rxAWS.js');
var rxSNS = new RxAWS.RxSNS();

var UserInfo = require('./models/userInfo.js');
var Photo = require('./models/photo.js');
var Link = require('./models/link.js');

exports.handler = function(event, context) {

  console.log(JSON.stringify(event, null, 2));

  event.Records.forEach(function(record) {

      switch (record.eventName) {
        case RxAWS.Insert:
        linkDidInsert(record, context);
          break;

        case RxAWS.Remove:
        linkDidDelete(record, context);
          break;

        default:
        context.done();
          break;
      }
  });
};

function linkDidInsert(record, context) {

  switch (record.dynamodb.NewImage.kindRawValue.N) {
    case Link.KindFollowUser:
    followUserLinkDidInsert(record, context)
      break;

    case Link.KindCommentPhoto:
    commentDidInsert(record, context)
      break;

    case Link.KindLikePhoto:
    likePhotoLinkDidInsert(record, context)
        break;

    default:
    context.done();
      break;
  };
};

function linkDidDelete(record, context) {

  switch (record.dynamodb.OldImage.kindRawValue.N) {
    case Link.KindFollowUser:
    followUserLinkDidDelete(record, context)
      break;

    case Link.KindCommentPhoto:
    commentDidDelete(record, context)
      break;

    case Link.KindLikePhoto:
    likePhotoLinkDidDelete(record, context)
      break;

    default:
    context.done();
      break;
  };
};

function commentDidInsert(record, context) {
  console.log('Index commentDidInsert');
  var photoUpdater = new Photo.PhotoUpdater(record.dynamodb.NewImage.itemReference.S)
  photoUpdater.rx_increaseCommentCount()
    .subscribe(
      function (x)      { RxAWS.handleSucceed("commentDidInsert", context)  },
      function (error)  { RxAWS.handleError(error, context) },
      function ()       { RxAWS.handleDone(context) }
    );
}

function commentDidDelete(record, context) {
  console.log('Index commentDidDelete');
  var photoUpdater = new Photo.PhotoUpdater(record.dynamodb.OldImage.itemReference.S)
  photoUpdater.rx_decreaseCommentCount()
    .subscribe(
      function (x)      { RxAWS.handleSucceed("commentDidDelete", context)  },
      function (error)  { RxAWS.handleError(error, context) },
      function ()       { RxAWS.handleDone(context) }
    );
}

function likePhotoLinkDidInsert(record, context) {
  console.log('Index likePhotoLinkDidInsert');
  var photoUpdater = new Photo.PhotoUpdater(record.dynamodb.NewImage.itemReference.S)
  var fromUserUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.NewImage.fromUserReference.S)
  photoUpdater.rx_increaseLikedCount()
    .flatMap (function (data) { return fromUserUpdater.rx_increaseLikedCount() })
    .flatMap (function (data) {
      var rx_toUserInfo = UserInfo.rx_getFromReference(record.dynamodb.NewImage.toUserReference.S)
      var rx_fromUserInfo = UserInfo.rx_getFromReference(record.dynamodb.NewImage.fromUserReference.S)
      var rx_photo = Photo.rx_getFromReference(record.dynamodb.NewImage.itemReference.S)
      return Rx.Observable.combineLatest(
        rx_toUserInfo,
        rx_fromUserInfo,
        rx_photo,
        function (toUserInfo, fromUserInfo, photo) {
           return [fromUserInfo.displayName.S + '喜欢了你的照片 -- ' + photo.title.S, toUserInfo.snsTopicArn.S]
        })
    })
    .flatMap (function (data) {
      return rxSNS.rx_publishToTopicArn(data[0], data[1])
    })
    .subscribe(
      function (x)      { RxAWS.handleSucceed("likePhotoLinkDidInsert", context)  },
      function (error)  { RxAWS.handleError(error, context) },
      function ()       { RxAWS.handleDone(context) }
    );
}

function likePhotoLinkDidDelete(record, context) {
  console.log('Index likePhotoLinkDidDelete');
  var photoUpdater = new Photo.PhotoUpdater(record.dynamodb.OldImage.itemReference.S)
  var fromUserUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.OldImage.fromUserReference.S)
  photoUpdater.rx_decreaseLikedCount()
    .flatMap (function (data) {
        return fromUserUpdater.rx_decreaseLikedCount()
    })
    .subscribe(
      function (x)      { RxAWS.handleSucceed("likePhotoLinkDidDelete", context)  },
      function (error)  { RxAWS.handleError(error, context) },
      function ()       { RxAWS.handleDone(context) }
    );
}

function followUserLinkDidInsert(record, context) {
  console.log('Index followUserLinkDidInsert');
  var fromUserUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.NewImage.fromUserReference.S)
  var toUserUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.NewImage.toUserReference.S)
  fromUserUpdater.rx_increaseFollowCount()
    .flatMap (function (data) {
        return toUserUpdater.rx_increaseFollowerCount()
    })
    .subscribe(
      function (x)      { RxAWS.handleSucceed("followUserLinkDidInsert", context)  },
      function (error)  { RxAWS.handleError(error, context) },
      function ()       { RxAWS.handleDone(context) }
    );
}

function followUserLinkDidDelete(record, context) {
  console.log('Index followUserLinkDidDelete');
  var fromUserUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.OldImage.fromUserReference.S)
  var toUserUpdater = new UserInfo.UserInfoUpdater(record.dynamodb.OldImage.toUserReference.S)
  fromUserUpdater.rx_decreaseFollowCount()
    .flatMap (function (data) {
        return toUserUpdater.rx_decreaseFollowerCount()
    })
    .subscribe(
      function (x)      { RxAWS.handleSucceed("followUserLinkDidDelete", context)  },
      function (error)  { RxAWS.handleError(error, context) },
      function ()       { RxAWS.handleDone(context) }
    );
}
