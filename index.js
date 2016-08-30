var Rx = require('rx');

var UserInfo = require('./models/userInfo.js');
var Photo = require('./models/photo.js');
var Link = require('./models/link.js');
var RxAWS = require('./rxAWS/rxAWS.js');

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

  var linkRecord = new Link.LinkRecord(record);

  linkRecord.rx_increaseCommentCountToPhoto()
    .subscribe(
      function (x) { context.succeed("Index Succeed commentDidInsert."); },
      function (error) { context.fail(error); },
      function () { context.done(); }
    );

}

function commentDidDelete(record, context) {

  var linkRecord = new Link.LinkRecord(record);

  linkRecord.rx_decreaseCommentCountToPhoto()
    .subscribe(
      function (x) { context.succeed("Index Succeed commentDidDelete."); },
      function (error) { context.fail(error); },
      function () { context.done(); }
    );
}

function likePhotoLinkDidInsert(record, context) {

  var linkRecord = new Link.LinkRecord(record);

  linkRecord.rx_increaseLikeCountToPhoto()
    .subscribe(
      function (x) { context.succeed("Index Succeed likePhotoLinkDidInsert."); },
      function (error) { context.fail(error); },
      function () { context.done(); }
    );
}

function likePhotoLinkDidDelete(record, context) {

  var linkRecord = new Link.LinkRecord(record);

  linkRecord.rx_decreaseLikeCountToPhoto()
    .subscribe(
      function (x) { context.succeed("Index Succeed likePhotoLinkDidDelete."); },
      function (error) { context.fail(error); },
      function () { context.done(); }
    );
}

function followUserLinkDidInsert(record, context) {

  console.log('Index followUserLinkDidInsert');

  var linkRecord = new Link.LinkRecord(record);

  //
  // linkRecord.rx_increaseLikeCountToPhoto()
  //   .subscribe(
  //     function (x) { context.succeed("Index Succeed likePhotoLinkDidInsert."); },
  //     function (error) { context.fail(error); },
  //     function () { context.done(); }
  //   );
}

function followUserLinkDidDelete(record, context) {

  console.log('Index followUserLinkDidDelete');

  var linkRecord = new Link.LinkRecord(record);
  //
  // linkRecord.rx_increaseLikeCountToPhoto()
  //   .subscribe(
  //     function (x) { context.succeed("Index Succeed likePhotoLinkDidInsert."); },
  //     function (error) { context.fail(error); },
  //     function () { context.done(); }
  //   );
}
