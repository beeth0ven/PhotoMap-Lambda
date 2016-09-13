// ------------ Photo ------------------------

var RxAWS = require('../rxAWS/rxAWS.js');
var DynamoDBModel = require('../rxAWS/dynamoDBModel.js');

class Photo extends DynamoDBModel.DynamoDBModel {

  get dynamoDBTableName() {
    return 'photomap-mobilehub-567053031-Photo'
  }

  get hashKeyAttribute() {
    return 'userReference'
  }

  get rangeKeyAttribute() {
    return 'creationTime'
  }

  rx_increaseLikedCount() {
    console.log('Photo rx_increaseLikeCount');
    return this.rx_addNumberForKey(1, 'likesNumber')
  }

  rx_decreaseLikedCount() {
    console.log('Photo rx_decreaseLikeCount');
    return this.rx_addNumberForKey(-1, 'likesNumber')
  }

  rx_increaseCommentCount() {
    console.log('Photo rx_increaseCommentCount');
    return this.rx_addNumberForKey(1, 'commentsNumber')
  }

  rx_decreaseCommentCount() {
    console.log('Photo rx_decreaseCommentCount');
    return this.rx_addNumberForKey(-1, 'commentsNumber')
  }
}

exports.Photo = Photo
