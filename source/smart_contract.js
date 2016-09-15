
const helper = require('./helper_functions');

/// FUNCTIONS ///////////////////////////////////////////////////////////////////

exports.postContractEthereumSolidity = function(
  sourceCode, parameters, name, callbackUrl, callback) {
  'use strict';

  // Check the sourceCode parameter is valid
  if (typeof sourceCode !== 'string') {
    callback(new Error('ERROR: source code for the smart contract is invalid or not provided'));
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

exports.getContract = function(id, callback) {
  'use strict';

  // Check the id parameter
  if (typeof id !== 'number') {
    callback(new Error('ERROR: the id parameter should be present and be an integer'));
    return;
  }

  // Do the request to blockchainiz via the helper function
  helper.requestBlockchainiz(
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

exports.postContractEthereumSolidityFunction = function(parameters, id, functionName, callback) {
  'use strict';

  // Check the 'parameters' parameter is valid. An array must be provided, even an empty one
  if (typeof parameters !== 'object' || !Array.isArray(parameters)) {
    callback(new Error('ERROR: the array of parameters is invalid or not provided'));
    return;
  }
  
  // Check the id parameter
  if (typeof id !== 'number') {
    callback(new Error('ERROR: the id parameter should be present and be an integer'));
    return;
  }

  // Check the functionName parameter is valid
  if (typeof functionName !== 'string') {
    callback(new Error('ERROR: the name of the function is invalid or not provided'));
    return;
  }

  // Do the request to blockchainiz via the helper function
  helper.requestBlockchainiz(
    {
      parameters: parameters,
    },
    '/contract/ethereum/solidity/' + id + '/' + functionName,
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
