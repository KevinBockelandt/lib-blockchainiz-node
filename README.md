
[![Build Status](https://travis-ci.org/KevinBockelandt/lib-blockchainiz-node.svg?branch=master)](https://travis-ci.org/KevinBockelandt/lib-blockchainiz-node) [![Coverage Status](https://coveralls.io/repos/github/KevinBockelandt/lib-blockchainiz-node/badge.svg?branch=master)](https://coveralls.io/github/KevinBockelandt/lib-blockchainiz-node?branch=master)

## Description

Blockchainiz is a platform to access the blockchain. It is dedicated to banks and insurance companies. This package is a node library to interact more easily with the Blockchainiz API.

## Installation

Simply use NPM with the following command:

```
npm install blockchainiz --save
```

This will download the package and add an entry in your project's `package.json` file.

## Setup

In your project's source code, you need to start by importing the blockchainiz package:

```javascript
const blockchainiz = require('../index.js');
```

Then you need to choose if you want to use the production version of Blockchainiz or the Sandbox (for test purposes - the default value):

```javascript
blockchainiz.useSandbox(true);  // false to use the production version
```

Finally you **need** to specify your set of keys to access the API (the library won't work until you do so):

```javascript
blockchainiz.setKeys('your public key', 'your private key');
```

## Reference

### Set the API key set to use

```javascript
blockchainiz.setKeys(publicKey, privateKey);
```

Parameter | Type | Description
--------- | ---- | -----------
publicKey | string | The public key
privateKey | string | The private key

### Set the version of the API to use

```javascript
blockchainiz.useSandbox(shouldUseSandbox);
```

Parameter | Type | Description
--------- | ---- | -----------
shouldUseSandbox | bool | True to use the sandbox. False to use the production version

### Get infos about the Bitcoin node

```javascript
blockchainiz.getInfoNodeBitcoin(function (err, data) {
  // data contains the informations
});
```

'data' key | Type | Description
---------- | ---- | -----------
version | number | The version number of the Bitcoin node used by the API
protocolVersion | number | The Bitcoin protocol version number of the node used by the API
blockNumber | number | Number of the last blocked mined on the Bitcoin blockchain
difficulty | number | Current difficulty on the Bitcoin network

### Get infos about the Ethereum node

```javascript
blockchainiz.getInfoNodeEthereum(function (err, data) {
  // data contains the informations
});
```

'data' key | Type | Description
---------- | ---- | -----------
networkProtocolVersion | string | Version of the network protocol of the node used by the API
ethereumProtocolVersion | string | Version of the Ethereum protocol of the node used by the API
solcVersion | string | Version of the solidity compiler used by the API
gasPrice | string | Current gas price in wei
blockNumber | number | Number of the most recent block on the Ethereum blockchain

### Create a new notary in the API

As of today, only the Bitcoin blockchain can be used to host notaries.

```javascript
blockchainiz.postNotary(format, data, function (err, data) {
  // data contains the response of Blockchainiz
});
```

Parameter | Type | Description
--------- | ---- | -----------
format | string | Format in which the data is encoded (allowed values: 'hex', 'base64', 'ascii')
data | string | The data to notarize

'data' key | Type | Description
---------- | ---- | -----------
txid | string | ID of the transaction

### Get a particular notary

```javascript
blockchainiz.getNotary(format, txid, function (err, data) {
  // data contains the response of Blockchainiz
});
```

Parameter | Type | Description
--------- | ---- | -----------
format | string | Format in which to return the result (allowed values: 'hex', 'base64', 'ascii')
txid | string | ID of the transaction on the blockchain

'data' key | Type | Description
---------- | ---- | -----------
data | string | Data notarized in the blockchain
status | string | Current status of the transaction. Can be 'mined' or 'not mined'
confirmations | number | Number of confirmations for that bloc
blockindex | number | Position of the transaction inside the bloc
blocktime | number | Timestamp in seconds of when the bloc was mined

> `blockindex` and `blocktime` won't be included if the notary has not been mined in a bloc yet

### Get all the notaries added with a particular key set

```javascript
blockchainiz.getNotaries(format, function (err, data) {
  // data contains all the notaries
});
```

Parameter | Type | Description
--------- | ---- | -----------
format | string | Format in which to return the result (allowed values: 'hex', 'base64', 'ascii')

The `data` parameter of the callback contains an array of objects. Each object represents a notary and follows the same format as in the method `getNotary`.

### Add a new smart contract on Ethereum

```javascript
blockchainiz.postContractEthereumSolidity(sourceCode, parameters, contractName, callbackUrl, function (err, data) {
  // data contains the response of Blockchainiz
});
```

Parameter | Type | Description
--------- | ---- | -----------
sourceCode | string | The source code of the smart contract to upload
parameters | array | Array of parameters to pass to the constructor
contractName | string | Name of the smart contract to upload in the sources
callbackUrl | string | A URL that will be called back when the contract is mined on Ethereum

'data' key | Type | Description
---------- | ---- | -----------
abi | object | The ABI if the contract returned by the solidity compiler
id | number | The Blockchainiz ID of the new contract

### Get infos about a smart contract added with Blockchainiz

```javascript
blockchainiz.getContract(id, function (err, data) {
  // data contains the response of Blockchainiz
});
```

Parameter | Type | Description
--------- | ---- | -----------
id | number | Id number of the smart conttract in the Blockchainiz API

'data' key | Type | Description
---------- | ---- | -----------
abi | object | The ABI definition of the contract
amount | number | Account of ether in the contract wallet
status | string | Status of the contract can be `mined` or `not mined`
address | string | Address of the contract

> `amount` and `address` won't be included if the contract has not been mined yet

### Call a function on an Ethereum smart contract

```javascript
blockchainiz.postContractEthereumSolidityFunction(parameters, id, functionName, function (err, data) {
  // data contains the response of Blockchainiz
});
```

Parameter | Type | Description
--------- | ---- | -----------
parameters | array | Array of parameters to pass to the function
id | number | ID number of the contract on Blockchainiz
functionName | string | Name of the function to call

'data' key | Type | Description
---------- | ---- | -----------
result (optional) | array | The result value of the smart contract function
txid (optional) | string | The ID number of the transaction

> `result` will only be present if the function is constant and returns something.
> `txid` will only be present if the function is not constant and so trigger an Ethereum transaction

## Next steps

The documentation of the API itself is available here: https://www.sandbox.blockchainiz.io/

You can sign up for a pair of keys on our website: https://www.blockchainiz.io/
