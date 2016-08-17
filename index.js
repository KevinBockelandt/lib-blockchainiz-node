
const info = require('./source/info');
const notaries = require('./source/notaries');


exports.getInfoNodeBitcoin = info.getInfoNodeBitcoin;
exports.getInfoNodeEthereum = info.getInfoNodeEthereum;

exports.postNotary = notaries.postNotary;
