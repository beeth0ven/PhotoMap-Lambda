function Context() {

  this.succeed = function (object) {
    console.log(object);
  };

  this.fail = function (error) {
    console.log(error);
  };

  this.done = function () {
    console.log('context done!');
  };
}

// ------------ Testing ------------

var Index = require('./index.js');
var UserInfo = require('./models/userInfo.js');
var Link = require('./models/link.js');
var RxAWS = require('./rxAWS/rxAWS.js');

var context = new Context();

Index.handler(Link.event, context)

// var time = 1472020859.327900.toFixed(6)

// console.log(time);

// var itemReference = Link.event.Records[0].dynamodb.NewImage.itemReference.S
// var keys = JSON.parse(itemReference)
// var param = {
//     "creationTime": {
//         "N": keys[1]
//     },
//     "userReference": {
//         "S": keys[0]
//     }
//   }
// console.log(itemReference);
// console.log([param]);

// var keys = RxAWS.keysFromReference(Link.event.Records[0].dynamodb.NewImage.itemReference.S)
//
// console.log(keys);
