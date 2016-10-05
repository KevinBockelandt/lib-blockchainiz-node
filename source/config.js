
const options = {
  sandboxUrl: 'https://sandbox.blockchainiz.io/api/v1',
  prodUrl: 'https://api.blockchainiz.io/api/v1',
  sandboxSocketIoUrl: 'https://sandbox.blockchainiz.io',
  prodSocketIoUrl: 'https://api.blockchainiz.io',
};

const getApiUrl = function (useSandbox) {
  return useSandbox
    ? options.sandboxUrl
    : options.prodUrl;
};

const getSocketioUrl = function (useSandbox) {
  return useSandbox
    ? options.sandboxSocketIoUrl
    : options.prodSocketIoUrl;
};

module.exports = {
  getApiUrl: getApiUrl,
  getSocketioUrl: getSocketioUrl,
};
