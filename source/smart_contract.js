/// MODULES /////////////////////////////////////////////////////////////////////

const helper = require('./helper_functions');

/// FUNCTIONS ///////////////////////////////////////////////////////////////////

exports.postContractEthereumSolidity = function(publicKey, privateKey, sourceCode, parameters, name, callbackUrl, callback) {
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

  // Check the sourceCode parameter is valid
  if (typeof sourceCode !== 'string') {
    callback(new Error('ERROR: the source code for the smart contract is invalid or not provided'));
    return;
  }

  // Check the 'parameters' parameter is valid. An array must be provided, even an empty one
  if (typeof parameters !== 'object' || !Array.isArray(parameters)) {
    callback(new Error('ERROR: the array of parameters is invalid or not provided'));
    return;
  }

  // Check the name parameter is valid
  if (typeof name !== 'string') {
    callback(new Error('ERROR: the name of the smart contract is invalid or not provided'));
    return;
  }

  // Do the request to blockchainiz via the helper function
  helper.requestBlockchainiz(
    publicKey,
    privateKey,
    {
      source: sourceCode,
      parameters: parameters,
      name: name,
      callback: callbackUrl,
    },
    '/contract/ethereum/solidity',
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

exports.getContract = function(publicKey, privateKey, id, callback) {
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

  // Check the id parameter
  if (typeof id !== 'number') {
    callback(new Error('ERROR: the id parameter should be present and be an integer'));
    return;
  }

  // Do the request to blockchainiz via the helper function
  helper.requestBlockchainiz(
    publicKey,
    privateKey,
    {
      id: id,
    },
    '/contract/' + id,
    'GET',
    function (err, res, body) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, body);
      }
    }
  );
};
