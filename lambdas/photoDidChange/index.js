var Rx = require('rx');
var Photo = require('./models/photo.js');
var RxAWS = require('./rxAWS/rxAWS.js');

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
  var photoRecord = new Photo.PhotoRecord(record);
  photoRecord.rx_increasePostCountToUser()
    .subscribe(
      function (x)      { RxAWS.handleSucceed("photoDidInsert", context)  },
      function (error)  { RxAWS.handleError(error, context) },
      function ()       { RxAWS.handleDone(context) }
    );
};

function photoDidDelete(record, context) {
  console.log('Index photoDidDelete');
  var photoRecord = new Photo.PhotoRecord(record);
  photoRecord.rx_decreasePostCountToUser()
    .subscribe(
      function (x)      { RxAWS.handleSucceed("photoDidDelete", context)  },
      function (error)  { RxAWS.handleError(error, context) },
      function ()       { RxAWS.handleDone(context) }
    );
};
