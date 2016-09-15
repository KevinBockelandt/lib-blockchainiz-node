
const should = require('should');
const blockchainiz = require('../index.js');
const helper = require('./helper_functions');
// this is a smart contract already on blockchainiz 
// that contains everything needed for tests
const refContract = 327;  

blockchainiz.setKeys(process.env.API_PUBLIC_KEY, process.env.API_PRIVATE_KEY);
var smartContractId;

///////////////////////////////////////////////////////////////////////////////

describe('Smart contract - postContractEthereumSolidity', function () {
  'use strict';

  // //////////////////////////////////////////////////////////////////////////

  it('should upload a SC and return it\'s ABI and blockchainiz ID', function (done) {
    this.timeout(4000);

    helper.readFile('test_data/testSmartContract.sol', function (data) {
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

  it('should fail because the source code parameter is null', function (done) {

    blockchainiz.postContractEthereumSolidity(
      null,
      ['This is a string'],
      'testSmartContract',
      null,
      function(err, data) {
        err.message.should.equal('ERROR: source code for the smart contract is invalid or not provided');
        done();
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the source code parameter is invalid', function (done) {

    blockchainiz.postContractEthereumSolidity(
      34577890,
      ['This is a string'],
      'testSmartContract',
      null,
      function(err, data) {
        err.message.should.equal('ERROR: source code for the smart contract is invalid or not provided');
        done();
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the parameters parameter is null', function (done) {

    blockchainiz.postContractEthereumSolidity(
      'contract {}',
      null,
      'testSmartContract',
      null,
      function(err, data) {
        err.message.should.equal('ERROR: the array of parameters is invalid or not provided');
        done();
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the parameters parameter is invalid', function (done) {

    blockchainiz.postContractEthereumSolidity(
      'contract {}',
      'This is a string',
      'testSmartContract',
      null,
      function(err, data) {
        err.message.should.equal('ERROR: the array of parameters is invalid or not provided');
        done();
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the name parameter is null', function (done) {

    blockchainiz.postContractEthereumSolidity(
      'contract {}',
      ['This is a string'],
      null,
      null,
      function(err, data) {
        err.message.should.equal('ERROR: the name of the smart contract is invalid or not provided');
        done();
      }
    );
  });
});

///////////////////////////////////////////////////////////////////////////////

describe('Smart contract - getContract', function () {
  'use strict';

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

  it('should fail because the id parameter is null', function (done) {
    blockchainiz.getContract(
      null,
      function(err, data) {
        err.message.should.equal('ERROR: the id parameter should be present and be an integer');
        done();
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the id parameter is not a number', function (done) {
    blockchainiz.getContract(
      'notANumber',
      function(err, data) {
        err.message.should.equal('ERROR: the id parameter should be present and be an integer');
        done();
      }
    );
  });
});

///////////////////////////////////////////////////////////////////////////////

describe('Smart contract - postContractEthereumSolidityFunction', function () {
  'use strict';

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

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the parameters parameter is null', function (done) {
    blockchainiz.postContractEthereumSolidityFunction(
      null,
      refContract,
      'getConstructorString',
      function(err, data) {
        err.message.should.equal('ERROR: the array of parameters is invalid or not provided');
        done();
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the parameters parameter is invalid', function (done) {
    blockchainiz.postContractEthereumSolidityFunction(
      'notAnArray',
      refContract,
      'getConstructorString',
      function(err, data) {
        err.message.should.equal('ERROR: the array of parameters is invalid or not provided');
        done();
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the id parameter is null', function (done) {
    blockchainiz.postContractEthereumSolidityFunction(
      [],
      null,
      'getConstructorString',
      function(err, data) {
        err.message.should.equal('ERROR: the id parameter should be present and be an integer');
        done();
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the id parameter is invalid', function (done) {
    blockchainiz.postContractEthereumSolidityFunction(
      [],
      'notANumber',
      'getConstructorString',
      function(err, data) {
        err.message.should.equal('ERROR: the id parameter should be present and be an integer');
        done();
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the functionName parameter is null', function (done) {
    blockchainiz.postContractEthereumSolidityFunction(
      [],
      refContract,
      null,
      function(err, data) {
        err.message.should.equal('ERROR: the name of the function is invalid or not provided');
        done();
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the id parameter is invalid', function (done) {
    blockchainiz.postContractEthereumSolidityFunction(
      [],
      refContract,
      4567890,
      function(err, data) {
        err.message.should.equal('ERROR: the name of the function is invalid or not provided');
        done();
      }
    );
  });
});
