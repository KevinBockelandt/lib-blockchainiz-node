
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
