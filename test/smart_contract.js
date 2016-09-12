
const should = require('should');
const blockchainiz = require('../index.js');
const helper = require('./helper_functions');
const refContract = 327;  // this is a smart contract already on blockchainiz that contains everything needed for tests

/// Tests /////////////////////////////////////////////////////////////////////

blockchainiz.setKeys(process.env.API_PUBLIC_KEY, process.env.API_PRIVATE_KEY);

describe('Smart contract routes related', function () {
  'use strict';

  var smartContractId;

  // //////////////////////////////////////////////////////////////////////////

  it('should upload a SC and return it\'s ABI and blockchainiz ID', function (done) {
    this.timeout(4000);

    helper.readFile('test/testSmartContract.sol', function (data) {
      blockchainiz.postContractEthereumSolidity(
        data,                 // the source code
        ['This is a string passed to the constructor'],
        'testSmartContract',  // name of the smart contract
        null,
        function(err, data) {
          if (err) {
            console.log(err);
          }
          data.abi.should.be.a.Array();
          data.id.should.be.a.Number();
          smartContractId = data.id;
          done();
        }
      );
    });
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should retrieve informations about a smart contract', function (done) {
    blockchainiz.getContract(
      refContract,
      function(err, data) {
        if (err) {
          console.log(err);
        }
        data.abi.should.be.a.Object();
        data.status.should.be.a.String();
        done();
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should call a function on a smart contract', function (done) {
    blockchainiz.postContractEthereumSolidityFunction(
      [],
      refContract,
      'getConstructorString',
      function(err, data) {
        if (err) {
          console.log(err);
        }
        data.result['0'].should.equal('This is a string passed to the constructor');
        done();
      }
    );
  });

});
