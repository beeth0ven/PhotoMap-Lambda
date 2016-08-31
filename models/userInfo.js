// ------------ UserInfoRecord ------------

var RxAWS = require('../rxAWS/rxAWS.js');
var sns = new RxAWS.RxSNS();
var rxDynamodb = new RxAWS.RxDynamoDB();

// function UserInfoRecord(record) {
//
//   this.record = record;
//
//   this.rx_createTopic = function () {
//
//     console.log('UserInfoRecord rx_createTopic');
//
//     var userId = this.record.dynamodb.Keys.userId.S;
//     var trimedUserId = userId.replace(":", "-");
//     return sns.rx_createTopic(trimedUserId)
//       .map(function (data) { return data.TopicArn })
//       .flatMap(function (topicArn) {
//
//         var params = {
//           'Key': record.dynamodb.Keys,
//           'TableName': 'photomap-mobilehub-567053031-UserInfo',
//           'AttributeUpdates': {
//             'snsTopicArn': {
//               'Action': 'PUT',
//               'Value': { 'S': topicArn }
//             }
//           }
//         };
//
//         return rxDynamodb.rx_updateItem(params);
//       });
//   };
//
//   this.rx_deleteTopic = function () {
//
//     console.log('UserInfoRecord rx_deleteTopic');
//
//     var snsTopicArn = this.record.dynamodb.OldImage.snsTopicArn.S;
//     return sns.rx_deleteTopicArn(snsTopicArn);
//   };
// };
//
//
// exports.UserInfoRecord = UserInfoRecord;

// ------------ UserInfoUpdater ------------

function UserInfoUpdater(reference) {

  this.reference = reference;

  this.getUpdateParams = function () {

    var keys = JSON.parse(reference)

    var params = {
      'Key': {
          "creationTime": {
              "N": keys[1].toFixed(6)
          },
          "userId": {
              "S": keys[0]
          }
        },
      'TableName': 'photomap-mobilehub-567053031-UserInfo',
      'AttributeUpdates': {}
    };

    return new RxAWS.RxDynamoDBUpdateParams(params);
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
    var updateParams = this.getUpdateParams()
    updateParams.addNumberForKey(number, key)
    return updateParams.rx_update()
  }
}

exports.UserInfoUpdater = UserInfoUpdater;
