
const should = require('should');
const blockchainiz = require('../index.js');

/// Tests /////////////////////////////////////////////////////////////////////

describe('Infos about nodes related methods', function () {
  'use strict';


  // //////////////////////////////////////////////////////////////////////////

  it('should return infos about the Bitcoin node used by the API', function (done) {
    blockchainiz.getInfoNodeBitcoin(function(err, data) {
      if (err) {
        console.log(err);
      }
      data.version.should.be.a.Number();
      data.protocolVersion.should.be.a.Number();
      data.blockNumber.should.be.a.Number();
      data.difficulty.should.be.a.Number();
      done();
    });
  });


  // //////////////////////////////////////////////////////////////////////////

  it('should return infos about the Ethereum node used by the API', function (done) {
    blockchainiz.getInfoNodeEthereum(function(err, data) {
      if (err) {
        console.log(err);
      }
      data.networkProtocolVersion.should.be.a.String();
      data.ethereumProtocolVersion.should.be.a.String();
      data.solcVersion.should.be.a.String();
      data.hashrate.should.be.a.Number();
      data.gasPrice.should.be.a.String();
      data.blockNumber.should.be.a.Number();
      done();
    });
  });

});
