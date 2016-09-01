
/// Modules ///////////////////////////////////////////////////////////////////

const should = require('should');
const blockchainiz = require('../index.js');
const setupSpecific = require('./setup_specific');
const helper = require('./helper_functions');

/// Tests /////////////////////////////////////////////////////////////////////

describe('Smart contract routes related', function () {
  'use strict';

  var smartContractId;

  // //////////////////////////////////////////////////////////////////////////

  it('should upload a SC and return it\'s ABI and blockchainiz ID', function (done) {
    this.timeout(4000);

    blockchainiz.postContractEthereumSolidity(
      setupSpecific.publicKey,
      setupSpecific.privateKey,
      'contract Test { }',
      [],
      'Test',
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

  // //////////////////////////////////////////////////////////////////////////

  it('should retrieve informations about a smart contract', function (done) {
    blockchainiz.getContract(
      setupSpecific.publicKey,
      setupSpecific.privateKey,
      smartContractId,
      function(err, data) {
        if (err) {
          console.log(err);
        }
        console.log(data);
        data.abi.should.be.a.Object();
        data.status.should.be.a.String();
        done();
      }
    );
  });

});
