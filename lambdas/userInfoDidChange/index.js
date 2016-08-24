var Rx = require('rx');

var UserInfo = require('./models/userInfo.js');
var Photo = require('./models/photo.js');
var RxAWS = require('./rxAWS/rxAWS.js');

const Insert = "INSERT";
const Modify = "MODIFY";
const Remove = "REMOVE";

exports.handler = function(event, context) {

    event.Records.forEach(function(record) {

      console.log(JSON.stringify(record, null, 2));

        switch (record.eventName) {
          case Insert:
          userInfoDidInsert(record, context);
            break;

          case Remove:
          userInfoDidDelete(record, context);
            break;

          default:
          context.done();
            break;
        }
    });
};

function userInfoDidInsert(record, context) {

  var userInfoRecord = new UserInfo.UserInfoRecord(record);

  userInfoRecord.rx_createTopic()
    .subscribe(
      function (x) { context.succeed("Succeed userInfoDidInsert."); },
      function (error) { context.fail(error); },
      function () { context.done(); }
    );
};

function userInfoDidDelete(record, context) {

  var userInfoRecord = new UserInfo.UserInfoRecord(record);

  userInfoRecord.rx_deleteTopic()
    .subscribe(
      function (x) { context.succeed("Succeed userInfoDidDelete."); },
      function (error) { context.fail(error); },
      function () { context.done(); }
    );
};
