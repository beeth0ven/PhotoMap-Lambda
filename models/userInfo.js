// ------------ UserInfoRecord ------------

var RxAWS = require('../rxAWS/rxAWS.js');
var sns = new RxAWS.RxSNS();
var dynamodb = new RxAWS.RxDynamoDB();

function UserInfoRecord(record) {

  this.record = record;

  this.rx_createTopic = function () {

    console.log('UserInfoRecord rx_createTopic');

    var userId = this.record.dynamodb.Keys.userId.S;
    var trimedUserId = userId.replace(":", "-");
    return sns.rx_createTopic(trimedUserId)
      .map(function (data) { return data.TopicArn })
      .flatMap(function (topicArn) {

        var params = {
          'Key': record.dynamodb.Keys,
          'TableName': 'photomap-mobilehub-567053031-UserInfo',
          'AttributeUpdates': {
            'snsTopicArn': {
              'Action': 'PUT',
              'Value': { 'S': topicArn }
            }
          }
        };

        return dynamodb.rx_updateItem(params);
      });
  };

  this.rx_deleteTopic = function () {

    console.log('UserInfoRecord rx_deleteTopic');

    var snsTopicArn = this.record.dynamodb.OldImage.snsTopicArn.S;
    return sns.rx_deleteTopicArn(snsTopicArn);
  };
};


exports.UserInfoRecord = UserInfoRecord;
