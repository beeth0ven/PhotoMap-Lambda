// ------------ Link ------------

exports.deleteFollowUserEvent =
{
    "Records": [
        {
            "eventID": "e9d106636a76c68fa85c04021c58d803",
            "eventName": "REMOVE",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "us-east-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1472608380,
                "Keys": {
                    "creationTime": {
                        "N": "1472542500.319333"
                    },
                    "fromUserReference": {
                        "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                    }
                },
                "OldImage": {
                    "kindRawValue": {
                        "N": "0"
                    },
                    "creationTime": {
                        "N": "1472542500.319333"
                    },
                    "toUserReference": {
                        "S": "[\"us-east-1:7982e028-e401-4dff-966b-af81de9fdb88\",1471233567.026141]"
                    },
                    "fromUserReference": {
                        "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                    }
                },
                "SequenceNumber": "74920600000000008690792043",
                "SizeBytes": 306,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:us-east-1:649756765455:table/photomap-mobilehub-567053031-Link/stream/2016-08-24T07:23:34.336"
        }
    ]
}

exports.insertFollowUserEvent =
{
    "Records": [
        {
            "eventID": "f9bed1bfdcdf41c6a8f00a4fba1af473",
            "eventName": "INSERT",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "us-east-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1472541900,
                "Keys": {
                    "creationTime": {
                        "N": "1472541916.096104"
                    },
                    "fromUserReference": {
                        "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                    }
                },
                "NewImage": {
                    "kindRawValue": {
                        "N": "0"
                    },
                    "creationTime": {
                        "N": "1472541916.096104"
                    },
                    "toUserReference": {
                        "S": "[\"us-east-1:7982e028-e401-4dff-966b-af81de9fdb88\",1471233567.026141]"
                    },
                    "fromUserReference": {
                        "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                    }
                },
                "SequenceNumber": "71742100000000008596490970",
                "SizeBytes": 306,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:us-east-1:649756765455:table/photomap-mobilehub-567053031-Link/stream/2016-08-24T07:23:34.336"
        }
    ]
}

exports.insertLikePhotoEvent =
{
    "Records": [{
        "eventID": "83f365a3d2d26bfce9f480f78edc34b9",
        "eventName": "INSERT",
        "eventVersion": "1.1",
        "eventSource": "aws:dynamodb",
        "awsRegion": "us-east-1",
        "dynamodb": {
            "ApproximateCreationDateTime": 1472096400,
            "Keys": {
                "creationTime": {
                    "N": "1472096409.930906"
                },
                "fromUserReference": {
                    "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                }
            },
            "NewImage": {
                "itemReference": {
                    "S": "[\"[\\\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\\\",1471233536.58108]\",1471238430.666237]"
                },
                "kindRawValue": {
                    "N": "1"
                },
                "creationTime": {
                    "N": "1472096409.930906"
                },
                "toUserReference": {
                    "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                },
                "fromUserReference": {
                    "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                }
            },
            "SequenceNumber": "46670100000000007444737127",
            "SizeBytes": 410,
            "StreamViewType": "NEW_AND_OLD_IMAGES"
        },
        "eventSourceARN": "arn:aws:dynamodb:us-east-1:649756765455:table/photomap-mobilehub-567053031-Link/stream/2016-08-24T07:23:34.336"
    }]
}


exports.deleteLikePhotoEvent =
{
    "Records": [{
        "eventID": "5794571e3a9da010cce7b1630febe311",
        "eventName": "REMOVE",
        "eventVersion": "1.1",
        "eventSource": "aws:dynamodb",
        "awsRegion": "us-east-1",
        "dynamodb": {
            "ApproximateCreationDateTime": 1472096460,
            "Keys": {
                "creationTime": {
                    "N": "1472096409.930906"
                },
                "fromUserReference": {
                    "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                }
            },
            "OldImage": {
                "itemReference": {
                    "S": "[\"[\\\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\\\",1471233536.58108]\",1471238430.666237]"
                },
                "kindRawValue": {
                    "N": "1"
                },
                "creationTime": {
                    "N": "1472096409.930906"
                },
                "toUserReference": {
                    "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                },
                "fromUserReference": {
                    "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                }
            },
            "SequenceNumber": "47485000000000007045958713",
            "SizeBytes": 410,
            "StreamViewType": "NEW_AND_OLD_IMAGES"
        },
        "eventSourceARN": "arn:aws:dynamodb:us-east-1:649756765455:table/photomap-mobilehub-567053031-Link/stream/2016-08-24T07:23:34.336"
    }]
}

exports.insertCommentEvent =
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

exports.deleteCommentEvent =
{
    "Records": [
        {
            "eventID": "e5f17fec76ab3ce130ac8049a16be752",
            "eventName": "REMOVE",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "us-east-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1472023740,
                "Keys": {
                    "creationTime": {
                        "N": "1472020859.327935"
                    },
                    "fromUserReference": {
                        "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                    }
                },
                "OldImage": {
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
                "SequenceNumber": "43464000000000011111784314",
                "SizeBytes": 421,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:us-east-1:649756765455:table/photomap-mobilehub-567053031-Link/stream/2016-08-24T07:23:34.336"
        }
    ]
}

// ------------ Photo ------------
exports.deletePhotoEvent =
{
    "Records": [
        {
            "eventID": "eb195c50ccb32773e546e44ebc428f98",
            "eventName": "REMOVE",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "us-east-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1472625180,
                "Keys": {
                    "creationTime": {
                        "N": "1471238431.666237"
                    },
                    "userReference": {
                        "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                    }
                },
                "OldImage": {
                    "commentsNumber": {
                        "N": "6"
                    },
                    "likesNumber": {
                        "N": "2"
                    },
                    "creationTime": {
                        "N": "1471238431.666237"
                    },
                    "thumbnailImageS3Key": {
                        "S": "public/1471238411.21948.png"
                    },
                    "userReference": {
                        "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                    },
                    "title": {
                        "S": "test"
                    },
                    "imageS3Key": {
                        "S": "public/1471238411.21838.png"
                    }
                },
                "SequenceNumber": "76360600000000007123315865",
                "SizeBytes": 323,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:us-east-1:649756765455:table/photomap-mobilehub-567053031-Photo/stream/2016-08-31T06:30:12.930"
        }
    ]
}

exports.insertPhotoEvent =
{
    "Records": [
        {
            "eventID": "7323488eaf0aa54a647ace83c2be4aa1",
            "eventName": "INSERT",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "us-east-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1471330560,
                "Keys": {
                    "creationTime": {
                        "N": "1471330612.177063"
                    },
                    "userReference": {
                        "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                    }
                },
                "NewImage": {
                    "commentsNumber": {
                        "N": "0"
                    },
                    "likesNumber": {
                        "N": "0"
                    },
                    "creationTime": {
                        "N": "1471330612.177063"
                    },
                    "thumbnailImageS3Key": {
                        "S": "public/1471330608.41104.png"
                    },
                    "userReference": {
                        "S": "[\"us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d2\",1471233536.58108]"
                    },
                    "title": {
                        "S": "11"
                    },
                    "imageS3Key": {
                        "S": "public/1471330608.40248.png"
                    }
                },
                "SequenceNumber": "8882400000000006748173951",
                "SizeBytes": 319,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:us-east-1:649756765455:table/photomap-mobilehub-567053031-Photo/stream/2016-08-16T06:54:23.305"
        }
    ]
};

// ------------ UserInfo ------------

exports.insertUserInfoEvent = {
    "Records": [
        {
            "eventID": "7f90e65c29caa4fc62a94075c6f847c6",
            "eventName": "INSERT",
            "eventVersion": "1.1",
            "eventSource": "aws:dynamodb",
            "awsRegion": "us-east-1",
            "dynamodb": {
                "ApproximateCreationDateTime": 1471581360,
                "Keys": {
                    "creationTime": {
                        "N": "1471234536.58108"
                    },
                    "userId": {
                        "S": "us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d8"
                    }
                },
                "NewImage": {
                    "followersNumber": {
                        "N": "0"
                    },
                    "creationTime": {
                        "N": "1471234536.58108"
                    },
                    "displayName": {
                        "S": "Test"
                    },
                    "imagePath": {
                        "S": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/10441352_1577799582504350_7424084453542704415_n.jpg?oh=621c1f9ea2f608453d0cf5bd5c56b4e1&oe=581F5E63"
                    },
                    "userId": {
                        "S": "us-east-1:fd3cfbd9-58cd-4cec-8fc0-beb8e5bb44d8"
                    }
                },
                "SequenceNumber": "22161900000000007104612404",
                "SizeBytes": 333,
                "StreamViewType": "NEW_AND_OLD_IMAGES"
            },
            "eventSourceARN": "arn:aws:dynamodb:us-east-1:649756765455:table/photomap-mobilehub-567053031-UserInfo/stream/2016-08-19T04:33:32.032"
        }
    ]
};
