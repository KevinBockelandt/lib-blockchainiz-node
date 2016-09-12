var fs = require('fs');
const setupSpecific = require('./setup_specific');

/**
 * Pause the execution for a specified duration
 * @param {number} duration The duration of the pause in milliseconds
 * @return {none} none
 */
exports.pauseExecution = function (duration) {
  var currentTime = new Date().getTime();
  while (currentTime + duration >= new Date().getTime()) {
  }
};

/**
 * Return the content of a file in a single string format
 * @param {string} filename Filename of the file to read
 * @param {function} callback The function to call back with the result
 * @return {none} nothing
 */
exports.readFile = function (filename, callback) {
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      callback(data);
    }
  });
};

exports.getPublicKey = function () {
  return process.env.API_PUBLIC_KEY 
    ? process.env.API_PUBLIC_KEY
    : setupSpecific.publicKey;
}

exports.getPrivateKey = function () {
  return process.env.API_PRIVATE_KEY 
    ? process.env.API_PRIVATE_KEY
    : setupSpecific.privateKey;
}