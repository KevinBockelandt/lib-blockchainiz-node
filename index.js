
const config = require('./source/config');
const info = require('./source/info');
const notaries = require('./source/notaries');
const smartContract = require('./source/smart_contract');
const socketio = require('./source/socketio');

exports.setKeys = config.setKeys;
exports.useSandbox = config.useSandbox;

exports.getInfoNodeBitcoin = info.getInfoNodeBitcoin;
exports.getInfoNodeEthereum = info.getInfoNodeEthereum;

exports.postNotary = notaries.postNotary;
exports.getNotary = notaries.getNotary;
exports.getNotaries = notaries.getNotaries;

exports.postContractEthereumSolidity = smartContract.postContractEthereumSolidity;
exports.getContract = smartContract.getContract;
exports.postContractEthereumSolidityFunction = smartContract.postContractEthereumSolidityFunction;

exports.onErrorText = socketio.onErrorText;
exports.onListenerContract = socketio.onListenerContract;
exports.onNewBlockEthereum = socketio.onNewBlockEthereum;
exports.listenerNewBlockEthereum = socketio.listenerNewBlockEthereum;
exports.listenerContract = socketio.listenerContract;