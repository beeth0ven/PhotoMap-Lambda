class Context {
  succeed(object) { }
  fail(error) { }
  done() { }
}

// ------------ Testing ------------

var Index = require('./index.js');
var Event = require('./models/event.js');

var context = new Context();

Index.handler(Event.followUserLinkDidDelete, context)

// var Rx = require('rx');
// var RxAWS = require('./rxAWS/rxAWS.js');
// var PhotoMap = require('./photoMap/photoMap.js');
// var rxSNS = new RxAWS.RxSNS();
// var rxDynamodb = new RxAWS.RxDynamoDB();
// var UserInfo = require('./models/userInfo.js');

// var Photo = require('./models/photo.js');

// var photo = new Photo.Photo()
// photo.parseReference("[\"[\\\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\\\",1471233536.58108]\",1471238430.666237]")
// console.log(photo.getParams());
// console.log(dynamoDBModel.rangeValue);
