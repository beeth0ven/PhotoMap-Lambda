var Rx = require('rx');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('config.json');

// ------------ Context ------------

exports.handleSucceed = function (x, context) {
  console.log("Context next:", x);
}

exports.handleError = function (error, context) {
  console.log("Context error:", error);
  context.fail(error)
}

exports.handleDone = function (context) {
  console.log("Context done");
  context.done();
}

// ------------ S3 ------------

var s3 = new AWS.S3();

function RxS3() {

  this.rx_deleteS3Object = function (bucket, key) {

    return Rx.Observable.create((observer) => {

      var params = {
        Bucket: bucket,
        Key: key
      };

      console.log('RxS3 Deleting S3Object:', key);

      s3.deleteObject(params, function(error, data) {
        if (error) {
          console.log('RxS3 Did Fail to Delete S3Object:', key);
          observer.onError(error);
        } else {
          console.log('RxS3 Did Delete S3Object:', key);
          observer.onNext(data);
          observer.onCompleted();
        };
      });

    })
  }
}

exports.RxS3 = RxS3;

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

  this.rx_publishToTopicArn = function (message, topicArn) {

    return Rx.Observable.create(function(observer) {

      var payload = {
        'default': 'title',
        'APNS': {
          'aps': {
            'alert': '',
            'sound': 'default',
            'badge': 1
          }
        }
      };

      payload.APNS.aps.alert = message
      // first have to stringify the inner APNS object...
      payload.APNS = JSON.stringify(payload.APNS)
      // then have to stringify the entire message payload
      payload = JSON.stringify(payload)

      console.log('RxSNS Publishing to', topicArn);

      sns.publish({
        Message: payload,
        MessageStructure: 'json',
        TopicArn: topicArn
      }, function(error, data) {
        if (error) {
          console.log('RxSNS Did Fail to Publish to', topicArn);
          observer.onError(error);
        } else {
          console.log('RxSNS Did Publish to', topicArn);
          observer.onNext(data);
          observer.onCompleted();
        }
      })

    })
  }
}

exports.RxSNS = RxSNS;

// ------------ DynamoDB ------------

var docClient = new AWS.DynamoDB.DocumentClient();

class RxDynamoDB {

  rx_update(params) {
    return Rx.Observable.create(function(observer) {
      var tableName = params.TableName
      console.log('RxDynamoDB Updating', tableName);
      docClient.update(params, function(error, data) {
        if (error) {
          console.log('RxDynamoDB Did Fail to Update', tableName);
          observer.onError(error);
        } else {
          console.log('RxDynamoDB Did Update', tableName);
          observer.onNext(data);
          observer.onCompleted();
        };
      });
    });
  }

  rx_get(params) {
    return Rx.Observable.create(function(observer) {
      var tableName = params.TableName
      console.log('RxDynamoDB Getting', tableName);
      docClient.get(params, function(error, data) {
        if (error) {
          console.log('RxDynamoDB Did Fail to Get', tableName);
          observer.onError(error);
        } else {
          console.log('RxDynamoDB Did Get', tableName);
          observer.onNext(data.Item);
          observer.onCompleted();
        };
      });
    })
  }

  rx_delete(params) {
    return Rx.Observable.create(function(observer) {
      var tableName = params.TableName
      console.log('RxDynamoDB Deleting', tableName);
      docClient.delete(params, function(error, data) {
        if (error) {
          console.log('RxDynamoDB Did Fail to Delete', tableName);
          observer.onError(error);
        } else {
          console.log('RxDynamoDB Did Delete', tableName);
          observer.onNext(data);
          observer.onCompleted();
        };
      });
    })
  }

  rx_batchWrite(params) {
    return Rx.Observable.create(function(observer) {
      var tableNames = Object.keys(params.RequestItems)
      console.log('RxDynamoDB Writing Items', tableNames);
      docClient.batchWrite(params, function(error, data) {
        if (error) {
          console.log('RxDynamoDB Did Fail to Write Items', tableNames);
          observer.onError(error);
        } else {
          console.log('RxDynamoDB Did Write Items', tableNames);
          observer.onNext(data);
          observer.onCompleted();
        };
      });
    })
  }

}

exports.RxDynamoDB = RxDynamoDB;

exports.Insert = "INSERT";
exports.Modify = "MODIFY";
exports.Remove = "REMOVE";

// ------------ Rx ------------

function observableGroup(observables) {

  if (observables.length == 0) {
    return Rx.Observable.just([])
  } else if (observables.length == 1) {
    return observables[0].take(1).map(data => [data])
  }

  observables = observables.map(datas => datas.catch(error => {
      console.log(error)
      return Rx.Observable.just()
    }
  ))

  return  Rx.Observable.zip(observables)
    .take(1)
    .map(datas => datas.filter(n => n))
}

exports.observableGroup = observableGroup;
