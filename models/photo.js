
exports.event = {
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
