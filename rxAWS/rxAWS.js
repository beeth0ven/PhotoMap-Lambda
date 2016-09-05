var Rx = require('rx');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('config.json');

// ------------ Context ------------

exports.handleSucceed = function (x, context) {
  console.log("Context Succeed:", x);
}

exports.handleError = function (error, context) {
  console.log("Context error:", error);
  context.fail(error)
}

exports.handleDone = function (context) {
  console.log("Context done");
  context.done();
}

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

var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

function RxDynamoDB() {

  this.rx_updateItem = function (params) {

    return Rx.Observable.create(function(observer) {
      var tableName = params.TableName

      console.log('RxDynamoDB Updating', tableName);

      dynamodb.updateItem(params, function(error, data) {
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

  this.rx_getItem = function (params) {

    return Rx.Observable.create(function(observer) {

      var tableName = params.TableName

      console.log('RxDynamoDB Getting', tableName);

      dynamodb.getItem(params, function(error, data) {
        if (error) {
          console.log('RxDynamoDB Did Fail to Get', tableName);
          observer.onError(error);
        } else {
          console.log('RxDynamoDB Did Get', tableName);
          observer.onNext(data);
          observer.onCompleted();
        };
      });

    })
    .map(function (data) { return data.Item })
  }
}

exports.RxDynamoDB = RxDynamoDB;

exports.Insert = "INSERT";
exports.Modify = "MODIFY";
exports.Remove = "REMOVE";

function getAddParamsFrom(params) {
  return getUpdateParamsForActionFromParams('ADD', params)
}

function getPutParamsFrom(params) {
  return getUpdateParamsForActionFromParams('PUT', params)
}

function getUpdateParamsForActionFromParams(action ,params) {
  for (var key in params) {
    var value = params[key]
    var valueType = typeof value
    switch (valueType) {
      case 'number':
        params[key] = {
          'Action': action,
          'Value': { 'N': value.toString() }
        }
        break;

      case 'string':
        params[key] = {
          'Action': action,
          'Value': { 'S': value }
        }
        break;

      default:
        console.log('Can not getAddAttributeParamsFrom:', value);
        console.log('Of type:', valueType);
        break;
    }
  }
  return params
}

exports.getAddParamsFrom = getAddParamsFrom;
exports.getPutParamsFrom = getPutParamsFrom;

function getAttributeParamsFrom(params) {

  for (var key in params) {
    var value = params[key]
    var valueType = typeof value
    switch (valueType) {
      case 'number':
        params[key] = {
          'N': value.toString()
        }
        break;
      case 'string':
        params[key] = {
          'S': value
        }
        break;

      default:
        console.log('Can not getAttributeParamsFrom:', value);
        console.log('Of type:', valueType);
        break;
    }
  }

  return params
}

exports.getAttributeParamsFrom = getAttributeParamsFrom;

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
