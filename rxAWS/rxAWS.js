var Rx = require('rx');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('config.json');

// ------------ SNS ------------

var sns = new AWS.SNS();

function RxSNS() {

  this.rx_createTopic = function (topicName) {

    return Rx.Observable.create(function(observer) {

      var params = { 'Name': topicName };

      console.log('RxSNS Creating topic name:', topicName);

      sns.createTopic(params, function(error, data) {
        if (error) {
          console.log('RxSNS Did Fail to Create topic name:', topicName);
          observer.onError(error);
        } else {
          console.log('RxSNS Did Create topic name:', topicName);
          observer.onNext(data);
          observer.onCompleted();
        };
      });

    });
  };

  this.rx_deleteTopicArn = function (topicArn) {

    return Rx.Observable.create(function(observer) {

      var params = { 'TopicArn': topicArn };

      console.log('RxSNS Deleting topic', topicArn);

      sns.deleteTopic(params, function(error, data) {
        if (error) {
          console.log('RxSNS Did Fail to Delete topic', topicArn);
          observer.onError(error);
        } else {
          console.log('RxSNS Did Delete topic', topicArn);
          observer.onNext(data);
          observer.onCompleted();
        };
      });

    });
  };

};

exports.RxSNS = RxSNS;

// var endpointArn = "arn:aws:sns:us-east-1:649756765455:endpoint/APNS/photomap_MOBILEHUB_567053031/b52353d5-dc2e-3695-a414-1c9195628b7c";
//
// var payload = {
//   default: 'Hello World',
//   APNS: {
//     aps: {
//       alert: 'Hello World',
//       sound: 'default',
//       badge: 1
//     }
//   }
// };
//
// // first have to stringify the inner APNS object...
// payload.APNS = JSON.stringify(payload.APNS);
// // then have to stringify the entire message payload
// payload = JSON.stringify(payload);
//
// console.log('sending push');
// sns.publish({
//   Message: payload,
//   MessageStructure: 'json',
//   TargetArn: endpointArn
// }, function(err, data) {
//   if (err) {
//     console.log(err.stack);
//     return;
//   }
//
//   console.log('push sent');
//   console.log(data);
// });


// ------------ DynamoDB ------------

var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

function RxDynamoDB() {

  this.rx_updateItem = function (params) {

    return Rx.Observable.create(function(observer) {

      console.log('RxDynamoDB Updating item.');
      var tableName = params.TableName

      dynamodb.updateItem(params, function(error, data) {
        if (error) {
          console.log('Did Fail to Update', tableName);
          observer.onError(error);
        } else {
          console.log('Did Update', tableName);
          observer.onNext(data);
          observer.onCompleted();
        };
      });

    });
  };

}

exports.RxDynamoDB = RxDynamoDB;

exports.Insert = "INSERT";
exports.Modify = "MODIFY";
exports.Remove = "REMOVE";
