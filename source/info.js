const request = require('request');
const config = require('./config');

exports.getInfoNodeBitcoin = opt => (callback) => {
  request(`${config.getApiUrl(opt.useSandbox)}/info/node/bitcoin`, (err, res, body) => {
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

exports.getInfoNodeEthereum = opt => (callback) => {
  request(`${config.getApiUrl(opt.useSandbox)}/info/node/ethereum`, (err, res, body) => {
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
