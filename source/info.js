
const request = require('request');
const config = require('./config');


exports.getInfoNodeBitcoin = function(callback) {
  'use strict';

  request(config.chosenUrl + '/info/node/bitcoin', function (err, res, body) {
    if (err) {
      callback(err, null, null);
    } else if (res.statusCode === 200) {
      let data = JSON.parse(body);
      callback(null, data);
    } else {
      callback(new Error('Error in the blockchainiz response for the /info/node/bitcoin route'));
    }
  });
};


exports.getInfoNodeEthereum = function(callback) {
  'use strict';

  request(config.chosenUrl + '/info/node/ethereum', function (err, res, body) {
    if (err) {
      callback(err, null, null);
    } else if (res.statusCode === 200) {
      let data = JSON.parse(body);
      callback(null, data);
    } else {
      callback(new Error('Error in the blockchainiz response for the /info/node/ethereum route'));
    }
  });
};

