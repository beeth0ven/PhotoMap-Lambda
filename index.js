// ------------ Index ------------

var LinkHandler = require('./handlers/linkHandler.js');
var PhotoHandler = require('./handlers/photoHandler.js');
var UserInfoHandler = require('./handlers/userInfoHandler.js');
var RxAWS = require('./rxAWS/rxAWS.js');

var Handler = LinkHandler;

exports.handler = function (event, context) {

  console.log(JSON.stringify(event, null, 2));
  var rx_records = event.Records.map(record => rx_recordDidChange(record))

  RxAWS.observableGroup(rx_records)
    .subscribe(
      function (x)      { RxAWS.handleSucceed(x, context)  },
      function (error)  { RxAWS.handleError(error, context) },
      function ()       { RxAWS.handleDone(context) }
    );
}

function rx_recordDidChange(record) {
  switch (record.eventName) {
    case RxAWS.Insert:
    return Handler.rx_recordDidInsert(record);
      break;

    case RxAWS.Modify:
    return Handler.rx_recordDidModify(record);
      break;

    case RxAWS.Remove:
    return Handler.rx_recordDidDelete(record);
      break;

    default:
    return Rx.Observable.just({});
      break;
  }
}
