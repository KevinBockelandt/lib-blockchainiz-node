const options = {
  sandboxUrl: 'https://sandbox.blockchainiz.io/api/v1',
  prodUrl: 'https://api.blockchainiz.io/v1',
  sandboxSocketIoUrl: 'https://sandbox.blockchainiz.io',
  prodSocketIoUrl: 'https://api.blockchainiz.io',
  sandboxSocketIoPath: '/api/v1/socket.io/',
  prodSocketIoPath: '/v1/socket.io/',
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

const getSocketioPath = (useSandbox) => {
  const socketIoPath = useSandbox
    ? options.sandboxSocketIoPath
    : options.prodSocketIoPath;
  return socketIoPath;
};

module.exports = {
  getApiUrl,
  getSocketioUrl,
  getSocketioPath,
};
