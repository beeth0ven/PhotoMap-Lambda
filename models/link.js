exports.event =
{
    "Records": [
        {
            "eventID": "c5842ba0761bfd468a942f047512e8c3",
            "eventName": "INSERT",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "us-east-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1472023680,
                "Keys": {
                    "creationTime": {
                        "N": "1472020859.327935"
                    },
                    "fromUserReference": {
                        "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                    }
                },
                "NewImage": {
                    "itemReference": {
                        "S": "[\"[\\\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\\\",1471233536.58108]\",1471238449.346346]"
                    },
                    "kindRawValue": {
                        "N": "2"
                    },
                    "creationTime": {
                        "N": "1472020859.327935"
                    },
                    "toUserReference": {
                        "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                    },
                    "fromUserReference": {
                        "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                    },
                    "content": {
                        "S": "test"
                    }
                },
                "SequenceNumber": "43463900000000011111673135",
                "SizeBytes": 421,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:us-east-1:649756765455:table/photomap-mobilehub-567053031-Link/stream/2016-08-24T07:23:34.336"
        }
    ]
}

// {
//     "Records": [
//         {
//             "eventID": "e5f17fec76ab3ce130ac8049a16be752",
//             "eventName": "REMOVE",
//             "eventVersion": "1.1",
//             "eventSource": "aws:dynamodb",
//             "awsRegion": "us-east-1",
//             "dynamodb": {
//                 "ApproximateCreationDateTime": 1472023740,
//                 "Keys": {
//                     "creationTime": {
//                         "N": "1472020859.327935"
//                     },
//                     "fromUserReference": {
//                         "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
//                     }
//                 },
//                 "OldImage": {
//                     "itemReference": {
//                         "S": "[\"[\\\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\\\",1471233536.58108]\",1471238449.346346]"
//                     },
//                     "kindRawValue": {
//                         "N": "2"
//                     },
//                     "creationTime": {
//                         "N": "1472020859.327935"
//                     },
//                     "toUserReference": {
//                         "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
//                     },
//                     "fromUserReference": {
//                         "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
//                     },
//                     "content": {
//                         "S": "test"
//                     }
//                 },
//                 "SequenceNumber": "43464000000000011111784314",
//                 "SizeBytes": 421,
//                 "StreamViewType": "NEW_AND_OLD_IMAGES"
//             },
//             "eventSourceARN": "arn:aws:dynamodb:us-east-1:649756765455:table/photomap-mobilehub-567053031-Link/stream/2016-08-24T07:23:34.336"
//         }
//     ]
// }

// ------------ UserInfoRecord ------------
var RxAWS = require('../rxAWS/rxAWS.js');
var dynamodb = new RxAWS.RxDynamoDB();

function LinkRecord(record) {

  this.record = record;

  this.rx_increaseCommentCountToPhoto = function () {

    var itemReference = this.record.dynamodb.NewImage.itemReference.S
    var keys = JSON.parse(itemReference)
    // console.log(keys[0], keys[1]);
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
      'AttributeUpdates': {
        'commentsNumber': {
          'Action': 'ADD',
          'Value': { 'N': '1' }
        }
      }
    };

    return dynamodb.rx_updateItem(params);
  }

  this.rx_decreaseCommentCountToPhoto = function () {

    var itemReference = this.record.dynamodb.OldImage.itemReference.S
    var keys = JSON.parse(itemReference)

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
      'AttributeUpdates': {
        'commentsNumber': {
          'Action': 'ADD',
          'Value': { 'N': '-1' }
        }
      }
    };

    return dynamodb.rx_updateItem(params);
  }
};


exports.LinkRecord = LinkRecord;
