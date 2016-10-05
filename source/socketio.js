const config = require('./config');
const io = require('socket.io-client');

exports.connect = function(opt) {
  'use strict';
  return io.connect(
    config.getSocketioUrl(opt.useSandbox), { path: '/api/v1/socket.io/' });
};

exports.onErrorText = function(con) {
  'use strict';
  return function(callback) {
    con.on('error_text', function (event, error) {
      callback(event, error);
    });
  };
};

exports.onListenerContract = function(con) {
  'use strict';
  return function(callback) {
    con.on('listener_contract', function (id, event, data) {
      callback(id, event, data);
    });
  };
};

exports.onNewBlockEthereum = function(con) {
  'use strict';
  return function(callback) {
    con.on('new_block_ethereum', function (hash) {
      callback(hash);
    });
  };
};

exports.listenerNewBlockEthereum = function(con) {
  'use strict';
  return function() {
    con.emit('listener', 'new_block_ethereum');
  };
};

exports.listenerContract = function(con) {
  'use strict';
  return function(idContract, nameEvent) {
    con.emit('listener_contract', idContract, nameEvent);
  };
};
