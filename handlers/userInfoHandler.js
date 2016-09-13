// ------------ UserInfoHandler ------------

var Rx = require('rx');
var RxAWS = require('../rxAWS/rxAWS.js');
var UserInfo = require('../models/userInfo.js');

exports.rx_recordDidInsert = function (record) {
  console.log('UserInfoHandler rx_recordDidInsert');
  var userInfo = new UserInfo.UserInfo();
  userInfo.record = record
  return userInfo.rx_createTopic()
};

exports.rx_recordDidModify = function (record) {
  return Rx.Observable.just({});
}

exports.rx_recordDidDelete = function (record) {
  console.log('UserInfoHandler rx_recordDidDelete');
  var userInfo = new UserInfo.UserInfo();
  userInfo.record = record
  return userInfo.rx_deleteTopic()
}
