const should = require('should');
const helper = require('./a_setup');
const blockchainiz = require('../index.js')({
  publicKey: process.env.API_PUBLIC_KEY,
  privateKey: process.env.API_PRIVATE_KEY,
  useSandbox: true,
});

var testTxid;

///////////////////////////////////////////////////////////////////////////////

describe('Notaries - postNotary', function () {
  it('should notarize some data inside a BTC transaction', function (done) {
    this.timeout(4000);

    blockchainiz.postNotary(
      'ascii',
      'Test string to notarize',
      function (err, data) {
        if (err) console.log(err);
        should.not.exist(err);
        data.txid.should.be.a.String();
        testTxid = data.txid;
        done();
      }
    );

    helper.pauseExecution(1000);
  });

  it('should fail because the format parameter is invalid', function (done) {
    blockchainiz.postNotary(
      'wrongFormat',
      'Test string to notarize',
      function (err, data) {
        err.message.should.equal('ERROR: the format type is not provided or wrong');
        done();
      }
    );
  });

  it('should fail because the data to notarize do not exist', function (done) {
    blockchainiz.postNotary(
      'ascii',
      null,
      function (err, data) {
        err.message.should.equal('ERROR: the data to notarize should be provided as a string');
        done();
      }
    );
  });

  it('should fail because the data to notarize is not a string', function (done) {
    blockchainiz.postNotary(
      'ascii',
      87533678,
      function (err, data) {
        err.message.should.equal('ERROR: the data to notarize should be provided as a string');
        done();
      }
    );
  });
});

///////////////////////////////////////////////////////////////////////////////

describe('Notaries - getNotary', function () {
  it('should retrieve data that were just notarized', function (done) {
    blockchainiz.getNotary(
      'ascii',
      testTxid,
      function (err, data) {
        if (err) console.error(err);
        data.data.should.equal('Test string to notarize');
        data.confirmations.should.be.a.Number();
        data.status.should.be.a.String();
        done();
      }
    );
  });

  it('should fail because the format parameter is invalid', function (done) {
    blockchainiz.getNotary(
      'wrongFormat',
      testTxid,
      function (err, data) {
        err.message.should.equal('ERROR: the format type is not provided or wrong');
        done();
      }
    );
  });

  it('should fail because the txid parameter is null', function (done) {
    blockchainiz.getNotary(
      'ascii',
      null,
      function (err, data) {
        err.message.should.equal('ERROR: the txid parameter should be present and a string');
        done();
      }
    );
  });

  it('should fail because the format parameter is invalid', function (done) {
    blockchainiz.getNotary(
      'ascii',
      098987876875,
      function (err, data) {
        err.message.should.equal('ERROR: the txid parameter should be present and a string');
        done();
      }
    );
  });
});

///////////////////////////////////////////////////////////////////////////////

describe('Notaries - getNotaries', function () {
  it('should retrieve all data that were notarized with those keys', function (done) {
    blockchainiz.getNotaries(
      'ascii',
      function (err, data) {
        if (err) {
          console.log(err);
        }
        data.notaries.length.should.be.above(0);
        let length = data.notaries.length;
        data.notaries[length-1].data.should.equal('Test string to notarize');
        data.notaries[length-1].confirmations.should.be.a.Number();
        data.notaries[length-1].status.should.be.a.String();
        done();
      }
    );
  });

  it('should fail because the format parameter is invalid', function (done) {
    blockchainiz.getNotaries(
      'wrongFormat',
      function (err, data) {
        err.message.should.equal('ERROR: the format type is not provided or wrong');
        done();
      }
    );
  });
});
