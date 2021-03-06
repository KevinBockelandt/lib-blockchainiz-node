const request = require('request');
const config = require('./config');
const helper = require('./helper_functions');

exports.postNotary = opt => (format, data, callback) => {
  // Check the format parameter is OK
  if (!helper.isFormatParameterOk(format)) {
    callback(new Error('ERROR: the format type is not provided or wrong'));
    return;
  }

  // Check the data to notarize exists and are a string
  if (typeof data !== 'string') {
    callback(new Error('ERROR: the data to notarize should be provided as a string'));
    return;
  }

  // Do the request to blockchainiz via the helper function
  helper.requestBlockchainiz(
    opt,
    { blockchain: 'BTC', format, content: data },
    '/notary',
    'POST',
    (err, res, body) => {
      /* istanbul ignore if */
      if (err) callback(err, null);
      else callback(null, body);
    });
};

exports.getNotary = opt => (format, txid, callback) => {
  // Check the format parameter is OK
  if (!helper.isFormatParameterOk(format)) {
    callback(new Error('ERROR: the format type is not provided or wrong'));
    return;
  }

  // Check the txid parameter
  if (typeof txid !== 'string') {
    callback(new Error('ERROR: the txid parameter should be present and a string'));
    return;
  }

  // Do the request to blockchainiz
  request({
    url: `${config.getApiUrl(opt.useSandbox)}/notary/${txid}?blockchain=BTC&format=${format}`,
    method: 'GET',
    json: true,
  },
  (err, res, body) => {
    callback(err, body);
  });
};

exports.getNotaries = opt => (format, callback) => {
  // Check the format parameter is OK
  if (!helper.isFormatParameterOk(format)) {
    callback(new Error('ERROR: the format type is not provided or wrong'));
    return;
  }

  // Do the request to blockchainiz via the helper function
  helper.requestBlockchainiz(
    opt,
    { blockchain: 'BTC', format },
    `/notaries?blockchain=BTC&format=${format}`,
    'GET',
    (err, res, body) => {
      /* istanbul ignore if */
      if (err) callback(err, null);
      else callback(null, body);
    });
};
