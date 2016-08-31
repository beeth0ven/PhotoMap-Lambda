// ------------ PhotoRecord ------------

var RxAWS = require('../rxAWS/rxAWS.js');
var UserInfo = require('./userInfo.js');
var rxDynamodb = new RxAWS.RxDynamoDB();

function PhotoRecord(record) {

  this.record = record;

  this.getRecordImage = function () {
    var newImage = this.record.dynamodb.NewImage
    var oldImage = this.record.dynamodb.OldImage
    return newImage != null ? newImage : oldImage
  }

  this.getUserUpdater = function () {
    var userReference =  this.getRecordImage().userReference.S
    return new UserInfo.UserInfoUpdater(userReference)
  }

  this.rx_increasePostCountToUser = function () {
    console.log('PhotoRecord rx_increasePostCountToUser');
    return this.getUserUpdater().rx_increasePostedCount()
  }

  this.rx_decreasePostCountToUser = function () {
    console.log('PhotoRecord rx_decreasePostCountToUser');
    return this.getUserUpdater().rx_decreasePostedCount()
  }
}

exports.PhotoRecord = PhotoRecord;

// ------------ PhotoUpdater ------------

function PhotoUpdater(reference) {

  this.reference = reference;

  this.getUpdateParams = function () {

    var keys = JSON.parse(reference)
    var params = {
      'Key': {
          "creationTime": {
              "N": keys[1].toFixed(6)
          },
          "userReference": {
              "S": keys[0]
          }
        },
      'TableName': 'photomap-mobilehub-567053031-Photo',
      'AttributeUpdates': {}
    }
    return new RxAWS.RxDynamoDBUpdateParams(params);
  }

  this.rx_increaseLikeCount = function () {
    console.log('PhotoUpdater rx_increaseLikeCount');
    return this.rx_addNumberForKey(1, 'likesNumber')
  }

  this.rx_decreaseLikeCount = function () {
    console.log('PhotoUpdater rx_decreaseLikeCount');
    return this.rx_addNumberForKey(-1, 'likesNumber')
  }

  this.rx_increaseCommentCount = function () {
    console.log('PhotoUpdater rx_increaseCommentCount');
    return this.rx_addNumberForKey(1, 'commentsNumber')
  }

  this.rx_decreaseCommentCount = function () {
    console.log('PhotoUpdater rx_decreaseCommentCount');
    return this.rx_addNumberForKey(-1, 'commentsNumber')
  }

  this.rx_addNumberForKey = function (number, key) {
      var updateParams = this.getUpdateParams()
      updateParams.addNumberForKey(number, key)
      return updateParams.rx_update()
    }
}

exports.PhotoUpdater = PhotoUpdater;
