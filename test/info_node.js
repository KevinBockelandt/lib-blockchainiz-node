
/// Modules ///////////////////////////////////////////////////////////////////

const blockchainiz = require('../index.js');
const should = require('should');


/// Tests /////////////////////////////////////////////////////////////////////

describe('Infos about nodes related methods', function () {
  'use strict';


  // //////////////////////////////////////////////////////////////////////////

  it('should return the value 2', function (done) {
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

});
