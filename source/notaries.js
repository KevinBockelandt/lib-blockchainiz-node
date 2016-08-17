/// MODULES /////////////////////////////////////////////////////////////////////

const helper = require('./helper_functions');

/// FUNCTIONS ///////////////////////////////////////////////////////////////////

exports.postNotary = function(publicKey, privateKey, blockchain, format, data, callback) {
  'use strict';

  // Check the keys are OK
  if (typeof publicKey !== 'string' || publicKey.length !== 32) {
    callback(new Error('ERROR: the public key is invalid or not provided'));
    return;
  }
  if (typeof privateKey !== 'string' || privateKey.length !== 128) {
    callback(new Error('ERROR: the private key is invalid or not provided'));
    return;
  }

  // Check the blockchain parameter is OK
  if (typeof blockchain !== 'string' || (blockchain !== 'BTC' && blockchain !== 'ETH')) {
    callback(new Error('ERROR: the blockchain type is not provided or wrong'));
    return;
  }

  // Check the format parameter is OK
  if (typeof format !== 'string' || (format !== 'hex' && format !== 'base64' && format !== 'ascii')) {
    callback(new Error('ERROR: the format type is not provided or wrong'));
    return;
  }

  // Check the data to notarize exists and are a string
  if (typeof format !== 'string') {
    callback(new Error('ERROR: the data to notarize should be provided as a string'));
    return;
  }

  // Do the request to blockchainiz via the helper function
  helper.requestBlockchainiz(
    publicKey,
    privateKey,
    {
      blockchain: blockchain,
      format: format,
      content: data
    },
    '/notary',
    'POST',
    function (err, res, body) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, body);
      }
    }
  );
};


