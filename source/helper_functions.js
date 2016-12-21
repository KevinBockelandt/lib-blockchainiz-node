const crypto = require('crypto');
const request = require('request');
const config = require('./config');

/**
 * Perform an HTTP request on Blockchainiz
 * @param {Object} opt The options provided by the user
 * @param {object} rawBody Data to send inside of the request
 * @param {string} path Path of the URL after blockchainiz
 * @param {string} method HTTP verb to use
 * @param {function} callback Function to call back with the result
 * @return {none} none
 */
exports.requestBlockchainiz = (opt, rawBody, path, method, callback) => {
  // a number that will always be higher than the last one when calling the blockchainiz API
  const nonce = Date.now();

  // create the HMAC token that will be used to authorize the transaction on the blockchainiz API
  // we use a different URL for blockchainiz according to the fact that we are in debug or test mode
  const hash = crypto.createHmac('SHA512', opt.privateKey)
    .update(`${nonce}${config.getApiUrl(opt.useSandbox)}${path}${JSON.stringify(rawBody)}`)
    .digest('hex');

  // make the request to blockchainiz to add the new entry in the smart contract
  request({
    url: config.getApiUrl(opt.useSandbox) + path,
    headers: {
      'x-Api-Key': opt.publicKey,
      'x-Api-Signature': hash,
      'x-Api-Nonce': nonce,
    },
    method,
    json: true,
    body: rawBody,
  },
  (err, res2, body2) => {
    callback(err, res2, body2);
  });
};

/**
 * Check that a format parameter has a correct value
 * @param {string} format Should be 'hex' or 'base64' or 'ascii'
 * @return {bool} True if the parameter is correct
 */
exports.isFormatParameterOk = format => (
  typeof format === 'string' &&
  (format === 'hex' || format === 'base64' || format === 'ascii')
);
