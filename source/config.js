const options = {
  sandboxUrl: 'https://sandbox.blockchainiz.io/api/v1',
  prodUrl: 'https://api.blockchainiz.io/api/v1',
  sandboxSocketIoUrl: 'https://sandbox.blockchainiz.io',
  prodSocketIoUrl: 'https://api.blockchainiz.io',
};

const getApiUrl = (useSandbox) => {
  const apiUrl = useSandbox
    ? options.sandboxUrl
    : options.prodUrl;
  return apiUrl;
};

const getSocketioUrl = (useSandbox) => {
  const socketIoUrl = useSandbox
    ? options.sandboxSocketIoUrl
    : options.prodSocketIoUrl;
  return socketIoUrl;
};

module.exports = {
  getApiUrl,
  getSocketioUrl,
};
