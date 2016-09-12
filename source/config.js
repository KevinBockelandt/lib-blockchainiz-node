
const options = {
  sandboxUrl: 'https://sandbox.blockchainiz.io/api/v1',
  prodUrl: 'https://api.blockchainiz.io/api/v1',
  chosenUrl: 'https://sandbox.blockchainiz.io/api/v1',
  publicKey: '',
  privateKey: '',
};

const setKeys = function (publicKey, privateKey) {
  options.publicKey = publicKey;
  options.privateKey = privateKey;
};

const useSandbox = function (shouldUseSandbox) {
  options.chosenUrl = shouldUseSandbox ? options.sandboxUrl : options.prodUrl;
};

module.exports = {
  options: options,
  setKeys: setKeys,
  useSandbox: useSandbox,
};