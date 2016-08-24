// ------------ UserInfoEvent ------------

exports.event = {
    "Records": [
        {
            "eventID": "7f90e65c29caa4fc62a94075c6f847c6",
            "eventName": "INSERT",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "us-east-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1471581360,
                "Keys": {
                    "creationTime": {
                        "N": "1471234536.58108"
                    },
                    "userId": {
                        "S": "us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d8"
                    }
                },
                "NewImage": {
                    "followersNumber": {
                        "N": "0"
                    },
                    "creationTime": {
                        "N": "1471234536.58108"
                    },
                    "displayName": {
                        "S": "Test"
                    },
                    "imagePath": {
                        "S": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/10441352_1577799582504350_7424084453542704415_n.jpg?oh=621c1f9ea2f608453d0cf5bd5c56b4e1&oe=581F5E63"
                    },
                    "userId": {
                        "S": "us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d8"
                    }
                },
                "SequenceNumber": "22161900000000007104612404",
                "SizeBytes": 333,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:us-east-1:649756765455:table/photomap-mobilehub-567053031-UserInfo/stream/2016-08-19T04:33:32.032"
        }
    ]
};

// ------------ UserInfoRecord ------------

var RxAWS = require('../rxAWS/rxAWS.js');
var sns = new RxAWS.RxSNS();
var dynamodb = new RxAWS.RxDynamoDB();

function UserInfoRecord(record) {

  this.record = record;

  this.rx_createTopic = function () {

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
    var snsTopicArn = this.record.dynamodb.OldImage.snsTopicArn.S;
    return sns.rx_deleteTopicArn(snsTopicArn);
  };
};


exports.UserInfoRecord = UserInfoRecord;
