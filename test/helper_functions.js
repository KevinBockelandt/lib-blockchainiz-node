var fs = require('fs');

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
  })
}
