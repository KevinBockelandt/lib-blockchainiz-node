
const crypto = require('crypto');
const request = require('request');
const config = require('./config').options;

/// FUNCTIONS ///////////////////////////////////////////////////////////////////

/**
 * Perform an HTTP request on Blockchainiz
 * @param {object} rawBody Data to send inside of the request
 * @param {string} path Path of the URL after blockchainiz
 * @param {string} method HTTP verb to use
 * @param {function} callback Function to call back with the result
 * @return {none} none
 */
exports.requestBlockchainiz = function (rawBody, path, method, callback) {

  // Check the keys are OK
  if (typeof config.publicKey !== 'string' || config.publicKey.length !== 32) {
    callback(new Error('ERROR: the public key is invalid or not provided'));
    return;
  }
  if (typeof config.privateKey !== 'string' || config.privateKey.length !== 128) {
    callback(new Error('ERROR: the private key is invalid or not provided'));
    return;
  }

  // a number that will always be higher than the last one when calling the blockchainiz API
  var nonce = Date.now();

  // create the HMAC token that will be used to authorize the transaction on the blockchainiz API
  // we use a different URL for blockchainiz according to the fact that we are in debug or test mode
  var hash = crypto.createHmac('SHA512', config.privateKey)
    .update('' + nonce + '' + config.chosenUrl + path + JSON.stringify(rawBody))
    .digest('hex');

  // make the request to blockchainiz to add the new entry in the smart contract
  request({
    url: config.chosenUrl + path,
    headers: {
      'x-Api-Key': config.publicKey,
      'x-Api-Signature': hash,
      'x-Api-Nonce': nonce
    },
    method: method,
    json: true,
    body: rawBody
  },
  function(err, res2, body2) {
    callback(err, res2, body2);
  });
};

/**
 * Check that a blockchain parameter has a correct value
 * @param {string} blockchain Should be 'BTC' or 'ETC'
 * @return {bool} True if the parameter is correct
 */
exports.isBlockchainParameterOk = function (blockchain) {
  return (typeof blockchain === 'string' && (blockchain === 'BTC' || blockchain === 'ETH'));
};

/**
 * Check that a format parameter has a correct value
 * @param {string} format Should be 'hex' or 'base64' or 'ascii'
 * @return {bool} True if the parameter is correct
 */
exports.isFormatParameterOk = function (format) {
  return (typeof format === 'string' && (format === 'hex' || format === 'base64' || format === 'ascii'));
};
