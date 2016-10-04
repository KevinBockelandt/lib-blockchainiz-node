
const config = require('./config').options;
const io = require('socket.io-client');

const blockchainizSocketIoClient = io.connect(
  config.chosenSocketIoUrl, { path: '/api/v1/socket.io/' });

blockchainizSocketIoClient.on('connect', function() {
  console.log('Connected to Blockchainiz through socket.io'); // eslint-disable-line
});

exports.onErrorText = function(callback) {
  'use strict';
  blockchainizSocketIoClient.on('error_text', function (event, error) {
    callback(event, error);
  });
};

exports.onListenerContract = function(callback) {
  'use strict';
  blockchainizSocketIoClient.on('listener_contract', function (id, event, data) {
    callback(id, event, data);
  });
};

exports.onNewBlockEthereum = function(callback) {
  'use strict';
  blockchainizSocketIoClient.on('new_block_ethereum', function (hash) {
    callback(hash);
  });
};

exports.listenerNewBlockEthereum = function() {
  'use strict';
  blockchainizSocketIoClient.emit('listener', 'new_block_ethereum');
};

exports.listenerContract = function(idContract, nameEvent) {
  'use strict';
  blockchainizSocketIoClient.emit('listener_contract', idContract, nameEvent);
};
