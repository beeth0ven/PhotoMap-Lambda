// ------------ Photo ------------------------

var RxAWS = require('../rxAWS/rxAWS.js');
var rxDynamodb = new RxAWS.RxDynamoDB();

const TableName = 'photomap-mobilehub-567053031-Photo';

function getParams(reference) {
  var keys = JSON.parse(reference)
  return {
    Key: {
      userReference: keys[0],
      creationTime: keys[1]
   },
    TableName: TableName
  }
}

function rx_getFromReference(reference) {
  var params = getParams(reference)
  return rxDynamodb.rx_get(params)
}

exports.rx_getFromReference = rx_getFromReference;

// ------------ PhotoUpdater

function PhotoUpdater(reference) {

  this.reference = reference;

  this.rx_increaseLikedCount = function () {
    console.log('PhotoUpdater rx_increaseLikeCount');
    return this.rx_addNumberForKey(1, 'likesNumber')
  }

  this.rx_decreaseLikedCount = function () {
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
    var params = getParams(reference)
    params.AttributeUpdates =
    {
      [key]: {
        Action: 'ADD',
        Value: number
      }
    }
    return rxDynamodb.rx_update(params)
  }
}

exports.PhotoUpdater = PhotoUpdater;
