// ------------ PhotoMap ------------

var RxAWS = require('../rxAWS/rxAWS.js');
var rxS3 = new RxAWS.RxS3();

function S3() {

  this.rx_deleteS3Object = function (key) {
    return rxS3.rx_deleteS3Object('photomap-userfiles-mobilehub-567053031', key)
  }
}

exports.S3 = S3;
