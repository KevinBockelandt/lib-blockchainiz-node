
/// Modules ///////////////////////////////////////////////////////////////////

const blockchainiz = require('../index.js');
const should = require('should');


/// Tests /////////////////////////////////////////////////////////////////////

describe('Infos about nodes related methods', function () {
  'use strict';


  // //////////////////////////////////////////////////////////////////////////

  it('should return the value 2', function (done) {
    blockchainiz.getInfoNodeBitcoin().should.be.exactly(2);
    done();
  });

});
