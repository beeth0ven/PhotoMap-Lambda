// ------------ UserInfoDidChange ------------

var Rx = require('rx');
var RxAWS = require('../rxAWS/rxAWS.js');
var UserInfo = require('../models/userInfo.js');

exports.handler = function(event, context) {

  console.log(JSON.stringify(event, null, 2));
  var rx_records = event.Records.map(record => rx_recordDidChange(record))

  RxAWS.observableGroup(rx_records)
    .subscribe(
      function (x)      { RxAWS.handleSucceed(x, context)  },
      function (error)  { RxAWS.handleError(error, context) },
      function ()       { RxAWS.handleDone(context) }
    );
};

function rx_recordDidChange(record) {
  switch (record.eventName) {
    case RxAWS.Insert:
    return rx_userInfoDidInsert(record);
      break;

    case RxAWS.Remove:
    return rx_userInfoDidDelete(record);
      break;

    default:
    return Rx.Observable.just({});
      break;
  }
}

function rx_userInfoDidInsert(record) {
  console.log('Index userInfoDidInsert');
  var userInfoRecord = new UserInfo.UserInfoRecord(record);
  return userInfoRecord.rx_createTopic()
};

function rx_userInfoDidDelete(record) {
  console.log('Index userInfoDidDelete');
  var userInfoRecord = new UserInfo.UserInfoRecord(record);
  return userInfoRecord.rx_deleteTopic()
};
