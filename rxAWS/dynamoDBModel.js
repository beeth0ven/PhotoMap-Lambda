var RxAWS = require('./rxAWS.js');
var rxDynamodb = new RxAWS.RxDynamoDB();

class DynamoDBModel {

  get dynamoDBTableName() {
    return
  }

  get hashKeyAttribute() {
    return
  }

  get rangeKeyAttribute() {
    return
  }

  get hashValue() {
    return this[this.hashKeyAttribute]
  }

  set hashValue(newValue) {
    this[this.hashKeyAttribute] = newValue
  }

  get rangeValue() {
    if (this.rangeKeyAttribute === undefined) { return }
    return this[this.rangeKeyAttribute]
  }

  set rangeValue(newValue) {
    this[this.rangeKeyAttribute] = newValue
  }

  parseReference(reference) {
    var keys = JSON.parse(reference)
    this.hashValue = keys[0]
    this.rangeValue = keys[1]
    return this
  }

  getParams() {
    var params = {
      Key: {
        [this.hashKeyAttribute]: this.hashValue,
      },
      TableName: this.dynamoDBTableName
    }
    if (this.rangeKeyAttribute !== undefined) {
      params.Key[this.rangeKeyAttribute] = this.rangeValue
    }
    return params
  }

  rx_setValueForKey(value, key) {
    var params = this.getParams()
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
    var params = this.getParams()
    params.AttributeUpdates =
    {
      [key]: {
        Action: 'ADD',
        Value: number
      }
    }
    return rxDynamodb.rx_update(params)
  }

  rx_get() {
    return rxDynamodb.rx_get(this.getParams())
  }

  rx_getFromReference(reference) {
    return this.parseReference(reference).rx_get()
  }
}

exports.DynamoDBModel = DynamoDBModel
