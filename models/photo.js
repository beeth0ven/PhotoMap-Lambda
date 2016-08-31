// ------------ PhotoUpdater ------------

var RxAWS = require('../rxAWS/rxAWS.js');

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
