// ------------ UserInfo ------------

var RxAWS = require('../rxAWS/rxAWS.js');
var rxSNS = new RxAWS.RxSNS();
var rxDynamodb = new RxAWS.RxDynamoDB();

const TableName = 'photomap-mobilehub-567053031-UserInfo';

function getParams(reference) {
  var keys = JSON.parse(reference)
  return {
    'Key': RxAWS.getAttributeParamsFrom({
              'userId': keys[0],
              'creationTime': keys[1]
           }),
    'TableName': TableName
  }
}

function rx_getFromReference(reference) {
  var params = getParams(reference)
  return rxDynamodb.rx_getItem(params)
}

exports.rx_getFromReference = rx_getFromReference;

// ------------ UserInfoRecord ------------

function UserInfoRecord(record) {

  this.record = record

  this.rx_createTopic = function () {
    console.log('UserInfoRecord rx_createTopic');
    var userId = this.record.dynamodb.Keys.userId.S; var creationTime = Number(this.record.dynamodb.Keys.creationTime.N)
    var reference = JSON.stringify([userId, creationTime]); var userUpdater = new UserInfoUpdater(reference)
    var topicName = userId.replace(":", "-");
    return rxSNS.rx_createTopic(topicName)
      .map(function (data) { return data.TopicArn })
      .flatMap(function (topicArn) {
        return userUpdater.rx_setSnsTopicArn(topicArn)
      })
  };

  this.rx_deleteTopic = function () {
    console.log('UserInfoRecord rx_deleteTopic');
    var snsTopicArn = this.record.dynamodb.OldImage.snsTopicArn.S;
    return rxSNS.rx_deleteTopicArn(snsTopicArn);
  };
};

exports.UserInfoRecord = UserInfoRecord;

// ------------ UserInfoUpdater ------------

function UserInfoUpdater(reference) {

  this.reference = reference;

  this.rx_setSnsTopicArn = function (topicArn) {
    var params = getParams(reference)
    params.AttributeUpdates = RxAWS.getPutParamsFrom({ 'snsTopicArn': topicArn })
    return rxDynamodb.rx_updateItem(params)
  }

  this.rx_increaseFollowCount = function () {
    console.log('UserInfoUpdater rx_increaseFollowCount');
    return this.rx_addNumberForKey(1, 'followingNumber')
  }

  this.rx_decreaseFollowCount = function () {
    console.log('UserInfoUpdater rx_decreaseFollowCount');
    return this.rx_addNumberForKey(-1, 'followingNumber')
  }

  this.rx_increaseFollowerCount = function () {
    console.log('UserInfoUpdater rx_increaseFollowerCount');
    return this.rx_addNumberForKey(1, 'followersNumber')
  }

  this.rx_decreaseFollowerCount = function () {
    console.log('UserInfoUpdater rx_decreaseFollowerCount');
    return this.rx_addNumberForKey(-1, 'followersNumber')
  }

  this.rx_increaseLikedCount = function () {
    console.log('UserInfoUpdater rx_increaseFollowCount');
    return this.rx_addNumberForKey(1, 'likedNumber')
  }

  this.rx_decreaseLikedCount = function () {
    console.log('UserInfoUpdater rx_decreaseLikedCount');
    return this.rx_addNumberForKey(-1, 'likedNumber')
  }

  this.rx_increasePostedCount = function () {
    console.log('UserInfoUpdater rx_increasePostedCount');
    return this.rx_addNumberForKey(1, 'postedNumber')
  }

  this.rx_decreasePostedCount = function () {
    console.log('UserInfoUpdater rx_decreasePostedCount');
    return this.rx_addNumberForKey(-1, 'postedNumber')
  }

  this.rx_addNumberForKey = function (number, key) {
    var params = getParams(reference)
    params.AttributeUpdates = RxAWS.getAddParamsFrom({ [key]: number })
    return rxDynamodb.rx_updateItem(params)
  }
}

exports.UserInfoUpdater = UserInfoUpdater;
