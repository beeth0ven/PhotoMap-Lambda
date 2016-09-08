class DynamoDBModel {
  constructor() {}

  get dynamoDBTableName() {
    return 'photomap-mobilehub-567053031-Photo'
  }

  get hashKeyAttribute() {
    return 'userReference'
  }

  get rangeKeyAttribute() {
    return 'creationTime'
  }

  get hashValue() {
    return this[this.hashKeyAttribute]
  }

  set hashValue(newValue) {
    this[this.hashKeyAttribute] = newValue
  }

  get rangeValue() {
    return this[this.rangeKeyAttribute]
  }

  set rangeValue(newValue) {
    this[this.rangeKeyAttribute] = newValue
  }

  parseReference(reference) {
    var keys = JSON.parse(reference)
    this.hashValue = keys[0]
    this.rangeValue = keys[1]
  }

  getParams() {
    return {
      Key: {
        [this.hashKeyAttribute]: this.hashValue,
        [this.rangeKeyAttribute]: this.rangeValue
      },
      TableName: this.dynamoDBTableName
    }
  }

  rx_setValueForKey(value, key) {
    var params = getParams()
    params.AttributeUpdates =
    {
      [key]: {
        Action: 'PUT',
        Value: value
      }
    }
    return rxDynamodb.rx_update(params)
  }

  rx_addNumberForKey(number, key) {
    var params = getParams()
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

exports.DynamoDBModel = DynamoDBModel
