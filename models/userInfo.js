// ------------ UserInfo ------------

var RxAWS = require('../rxAWS/rxAWS.js');
var rxSNS = new RxAWS.RxSNS();
var DynamoDBModel = require('../rxAWS/dynamoDBModel.js');

class UserInfo extends DynamoDBModel.DynamoDBModel {

  get dynamoDBTableName() {
    return 'photomap-mobilehub-567053031-UserInfo'
  }

  get hashKeyAttribute() {
    return 'userId'
  }

  get rangeKeyAttribute() {
    return 'creationTime'
  }

  rx_setSnsTopicArn(topicArn) {
    console.log('UserInfo rx_setSnsTopicArn');
    return this.rx_setValueForKey(topicArn, 'topicArn')
  }

  rx_increaseFollowCount() {
    console.log('UserInfo rx_increaseFollowCount');
    return this.rx_addNumberForKey(1, 'followingNumber')
  }

  rx_decreaseFollowCount() {
    console.log('UserInfo rx_decreaseFollowCount');
    return this.rx_addNumberForKey(-1, 'followingNumber')
  }

  rx_increaseFollowerCount() {
    console.log('UserInfo rx_increaseFollowerCount');
    return this.rx_addNumberForKey(1, 'followersNumber')
  }

  rx_decreaseFollowerCount() {
    console.log('UserInfo rx_decreaseFollowerCount');
    return this.rx_addNumberForKey(-1, 'followersNumber')
  }

  rx_increaseLikedCount() {
    console.log('UserInfo rx_increaseFollowCount');
    return this.rx_addNumberForKey(1, 'likedNumber')
  }

  rx_decreaseLikedCount() {
    console.log('UserInfo rx_decreaseLikedCount');
    return this.rx_addNumberForKey(-1, 'likedNumber')
  }

  rx_increasePostedCount() {
    console.log('UserInfo rx_increasePostedCount');
    return this.rx_addNumberForKey(1, 'postedNumber')
  }

  rx_decreasePostedCount() {
    console.log('UserInfo rx_decreasePostedCount');
    return this.rx_addNumberForKey(-1, 'postedNumber')
  }

  rx_createTopic() {
    console.log('UserInfo rx_createTopic');
    this.hashValue = this.record.dynamodb.Keys.userId.S; this.rangeValue = Number(this.record.dynamodb.Keys.creationTime.N)
    var userInfo = this
    var topicName = this.hashValue.replace(":", "-");
    return rxSNS.rx_createTopic(topicName)
      .map(function (data) { return data.TopicArn })
      .flatMap(function (topicArn) {
        return userInfo.rx_setSnsTopicArn(topicArn)
      })
  };

  rx_deleteTopic() {
    console.log('UserInfo rx_deleteTopic');
    var snsTopicArn = this.record.dynamodb.OldImage.snsTopicArn.S;
    return rxSNS.rx_deleteTopicArn(snsTopicArn);
  };
}

exports.UserInfo = UserInfo
