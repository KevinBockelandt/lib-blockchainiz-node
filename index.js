
const info = require('./source/info');
const notaries = require('./source/notaries');
const smartContract = require('./source/smart_contract');
const socketio = require('./source/socketio');

module.exports = function (options) {
  'use strict';

  // TODO : check the content of the options object

  // Start the socket.io connection
  let connection = socketio.connect(options);

  return {

    // info node
    getInfoNodeBitcoin: info.getInfoNodeBitcoin(options),
    getInfoNodeEthereum: info.getInfoNodeEthereum(options),

    // notaries
    postNotary: notaries.postNotary(options),
    getNotary: notaries.getNotary(options),
    getNotaries: notaries.getNotaries(options),

    // smart contract
    postContractEthereumSolidity: smartContract.postContractEthereumSolidity(options),
    getContract: smartContract.getContract(options),
    postContractEthereumSolidityFunction: smartContract.postContractEthereumSolidityFunction(options),

    // socket.io
    onErrorText: socketio.onErrorText(connection),
    onListenerContract: socketio.onListenerContract(connection),
    onNewBlockEthereum: socketio.onNewBlockEthereum(connection),
    listenerNewBlockEthereum: socketio.listenerNewBlockEthereum(connection),
    listenerContract: socketio.listenerContract(connection),
  };
};
