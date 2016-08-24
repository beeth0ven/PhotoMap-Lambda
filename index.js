var Rx = require('rx');

var UserInfo = require('./models/userInfo.js');
var Photo = require('./models/photo.js');
var Link = require('./models/link.js');
var RxAWS = require('./rxAWS/rxAWS.js');

const Insert = "INSERT";
const Modify = "MODIFY";
const Remove = "REMOVE";

const LinkKindFollowUser = "0";
const LinkKindLikePhoto = "1";
const LinkKindCommentPhoto = "2";

exports.handler = function(event, context) {

    event.Records.forEach(function(record) {

      console.log(JSON.stringify(record, null, 2));

        switch (record.eventName) {
          case Insert:
          linkDidInsert(record, context);
            break;

          case Remove:
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
    case LinkKindCommentPhoto:
    commentDidInsert(record, context)
      break;

    default:
    context.done();
      break;
  };
};

function linkDidDelete(record, context) {

  switch (record.dynamodb.OldImage.kindRawValue.N) {
    case LinkKindCommentPhoto:
    commentDidDelete(record, context)
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
      function (x) { context.succeed("Succeed commentDidInsert."); },
      function (error) { context.fail(error); },
      function () { context.done(); }
    );

}

function commentDidDelete(record, context) {

  var linkRecord = new Link.LinkRecord(record);

  linkRecord.rx_decreaseCommentCountToPhoto()
    .subscribe(
      function (x) { context.succeed("Succeed commentDidDelete."); },
      function (error) { context.fail(error); },
      function () { context.done(); }
    );
}
