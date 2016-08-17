/// MODULES /////////////////////////////////////////////////////////////////////

const crypto = require('crypto');
const request = require('request');
const config = require('./config');

/// FUNCTIONS ///////////////////////////////////////////////////////////////////

/**
 * Perform an HTTP request on Blockchainiz
 * @param {string} publicKey The public key to use in the request
 * @param {string} privateKey The private key to use in the request
 * @param {object} rawBody Data to send inside of the request
 * @param {string} path Path of the URL after blockchainiz
 * @param {string} method HTTP verb to use
 * @param {function} callback Function to call back with the result
 * @return {none} none
 */
exports.requestBlockchainiz = function (publicKey, privateKey, rawBody, path, method, callback) {

  // a number that will always be higher than the last one when calling the blockchainiz API
  var nonce = Date.now();

  // create the HMAC token that will be used to authorize the transaction on the blockchainiz API
  // we use a different URL for blockchainiz according to the fact that we are in debug or test mode
  var hash = crypto.createHmac('SHA512', privateKey)
    .update('' + nonce + '' + config.chosenUrl + path + JSON.stringify(rawBody))
    .digest('hex');

  // make the request to blockchainiz to add the new entry in the smart contract
  request({
    url: config.chosenUrl + path,
    headers: {
      'x-Api-Key': publicKey,
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
