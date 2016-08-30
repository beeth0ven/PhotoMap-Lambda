// ------------ UserInfoRecord ------------

var RxAWS = require('../rxAWS/rxAWS.js');
var dynamodb = new RxAWS.RxDynamoDB();

function LinkRecord(record) {

  this.record = record;

  var newImage = this.record.dynamodb.NewImage
  var oldImage = this.record.dynamodb.OldImage

  this.recordImage = newImage != null ? newImage : oldImage

  this.rx_increaseCommentCountToPhoto = function () {

    console.log('LinkRecord rx_increaseCommentCountToPhoto');

    var attributes = {
      'commentsNumber': {
        'Action': 'ADD',
        'Value': { 'N': '1' }
      }
    }

    return this.rx_updatePhoto(attributes)
  }

  this.rx_decreaseCommentCountToPhoto = function () {

    console.log('LinkRecord rx_decreaseCommentCountToPhoto');

    var attributes = {
      'commentsNumber': {
        'Action': 'ADD',
        'Value': { 'N': '-1' }
      }
    }

    return this.rx_updatePhoto(attributes)
  }


  this.rx_increaseLikeCountToPhoto = function () {

    console.log('LinkRecord rx_increaseLikeCountToPhoto');

    var attributes = {
      'likesNumber': {
        'Action': 'ADD',
        'Value': { 'N': '1' }
      }
    }

    return this.rx_updatePhoto(attributes)
  }

  this.rx_decreaseLikeCountToPhoto = function () {

    console.log('LinkRecord rx_decreaseLikeCountToPhoto');

    var attributes = {
      'likesNumber': {
        'Action': 'ADD',
        'Value': { 'N': '-1' }
      }
    }

    return this.rx_updatePhoto(attributes)
  }

  this.rx_updatePhoto = function (attributes) {

    console.log('LinkRecord rx_updatePhoto');

    var keys = JSON.parse(this.recordImage.itemReference.S)
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
      'AttributeUpdates': attributes
    };

    return dynamodb.rx_updateItem(params);
  }
};

exports.LinkRecord = LinkRecord;

exports.KindFollowUser = "0";
exports.KindLikePhoto = "1";
exports.KindCommentPhoto = "2";
