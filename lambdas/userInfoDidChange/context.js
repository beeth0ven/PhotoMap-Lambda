function Context() {

  this.succeed = function (object) {
    console.log(object);
  };

  this.fail = function (error) {
    console.log(error);
  };

  this.done = function () {
    console.log('context done!');
  };
}

// ------------ Testing ------------

var Index = require('./index.js');
var UserInfo = require('./models/userInfo.js');

var context = new Context();

Index.handler(UserInfo.event, context)
