const config = require('./config');
const io = require('socket.io-client');

let listenerNewBlockEthereum = false;

exports.connect = (opt) => {
  const connexion = io.connect(config.getSocketioUrl(opt.useSandbox), {
    path: config.getSocketioPath(opt.useSandbox),
  });

  connexion.on('reconnect', () => {
    if (listenerNewBlockEthereum) {
      connexion.emit('listener', 'new_block_ethereum');
    }
  return connexion;
};

exports.onErrorText = con => (callback) => {
  con.on('error_text', (event, error) => {
    callback(event, error);
  });
};

exports.onListenerContract = con => (callback) => {
  con.on('listener_contract', (id, event, data) => {
    callback(id, event, data);
  });
};

exports.onNewBlockEthereum = con => (callback) => {
  con.on('new_block_ethereum', (hash) => {
    callback(hash);
  });
};

exports.listenerNewBlockEthereum = con => () => {
  con.emit('listener', 'new_block_ethereum');
  listenerNewBlockEthereum = true;
};

exports.listenerContract = con => (idContract, nameEvent) => {
  con.emit('listener_contract', idContract, nameEvent);
};
