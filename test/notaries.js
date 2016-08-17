
/// Modules ///////////////////////////////////////////////////////////////////

const should = require('should');
const blockchainiz = require('../index');
const setupSpecific = require('./setup_specific');
const notaries = require('../source/notaries');

/// Tests /////////////////////////////////////////////////////////////////////

describe('Notaries related methods', function () {
  'use strict';

  // //////////////////////////////////////////////////////////////////////////

  it('should notarize some data inside a BTC transaction', function (done) {
    notaries.postNotary(
      setupSpecific.publicKey,
      setupSpecific.privateKey,
      'BTC',
      'ascii',
      'Test string to notarize',
      function (err, data) {
        if (err) {
          console.log(err);
        }
        data.txid.should.be.a.String();
        done();
      });
  });

});
