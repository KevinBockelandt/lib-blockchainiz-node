
const should = require('should');
const blockchainiz = require('../index');
const setupSpecific = require('./setup_specific');
const helper = require('./helper_functions');

/// Tests /////////////////////////////////////////////////////////////////////

blockchainiz.setKeys(helper.getPublicKey(), helper.getPrivateKey());

describe('Notaries related methods', function () {
  'use strict';

  let testTxid;

  // //////////////////////////////////////////////////////////////////////////

  it('should notarize some data inside a BTC transaction', function (done) {
    this.timeout(4000);

    blockchainiz.postNotary(
      'BTC',
      'ascii',
      'Test string to notarize',
      function (err, data) {
        if (err) {
          console.log(err);
        }
        data.txid.should.be.a.String();
        testTxid = data.txid;
        done();
      }
    );

    helper.pauseExecution(1000);
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should retrieve data that were just notarized', function (done) {
    blockchainiz.getNotary(
      'BTC',
      'ascii',
      testTxid,
      function (err, data) {
        if (err) {
          console.log(err);
        }
        data.data.should.equal('Test string to notarize');
        data.confirmations.should.be.a.Number();
        data.status.should.be.a.String();
        done();
      });
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should retrieve all data that were notarized with those keys', function (done) {
    blockchainiz.getNotaries(
      'BTC',
      'ascii',
      function (err, data) {
        if (err) {
          console.log(err);
        }
        let length = data.notaries.length;
        length.should.be.above(0);
        data.notaries[length-1].data.should.equal('Test string to notarize');
        data.notaries[length-1].confirmations.should.be.a.Number();
        data.notaries[length-1].status.should.be.a.String();
        done();
      });
  });

});
