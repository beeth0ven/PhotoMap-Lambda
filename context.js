function Context() {
  this.succeed = function (object) {}
  this.fail = function (error) {}
  this.done = function () {}
}

// ------------ Testing ------------

var Index = require('./index.js');
var Event = require('./models/event.js');

var context = new Context();

Index.handler(Event.commentDidInsert, context)

// var Rx = require('rx');
// var RxAWS = require('./rxAWS/rxAWS.js');
// var rxSNS = new RxAWS.RxSNS();
// var rxDynamodb = new RxAWS.RxDynamoDB();
// var UserInfo = require('./models/userInfo.js');


// var rx_int = Rx.Observable.fromArray([1,2,3])
// var rx_int2 = Rx.Observable.fromArray([11,12,13])
// var rx_int2 =
// // Rx.Observable.throwError(new Error('woops'))
//                 // .catch(Observable.empty())
//   Rx.Observable.create(observer => observer.onError(new Error('woops')))
//     .catch(function (error) {
//       console.log(error);
//       return Rx.Observable.just()
//     })

// Rx.Observable.zip(rx_int, rx_int2)
// rx_int
  // .take(1)
  // .map(datas => datas.filter(n => n))
  // observableGroup([rx_int, rx_int2])
  //   .subscribe(
  //     x     => console.log(x),
  //     error => console.log(error),
  //     ()    => console.log('done')
  //   )
