
const request = require('request');
const config = require('./config').options;


exports.getInfoNodeBitcoin = function (callback) {
  request(`${config.chosenUrl}/info/node/bitcoin`, function (err, res, body) {
    /* istanbul ignore if */
    if (err) {
      callback(err, null, null);
    /* istanbul ignore else */
    } else if (res.statusCode === 200) {
      const data = JSON.parse(body);
      callback(null, data);
    } else {
      callback(new Error('Error in the blockchainiz response for the /info/node/bitcoin route'));
    }
  });
};


exports.getInfoNodeEthereum = function (callback) {
  request(`${config.chosenUrl}/info/node/ethereum`, function (err, res, body) {
    /* istanbul ignore if */
    if (err) {
      callback(err, null, null);
    /* istanbul ignore else */
    } else if (res.statusCode === 200) {
      const data = JSON.parse(body);
      callback(null, data);
    } else {
      callback(new Error('Error in the blockchainiz response for the /info/node/ethereum route'));
    }
  });
};
