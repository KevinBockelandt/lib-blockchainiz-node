
const should = require('should');
const blockchainiz = require('../index');
const helper = require('./helper_functions');

var testTxid;

///////////////////////////////////////////////////////////////////////////////

describe('Notaries - postNotary', function () {
  'use strict';

  // //////////////////////////////////////////////////////////////////////////

  it('should notarize some data inside a BTC transaction', function (done) {
    this.timeout(4000);
    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, process.env.API_PRIVATE_KEY);

    blockchainiz.postNotary(
      'ascii',
      'Test string to notarize',
      function (err, data) {
        if (err) {
          console.log(err);
        }
        should.not.exist(err);
        data.txid.should.be.a.String();
        testTxid = data.txid;
        done();
      }
    );

    helper.pauseExecution(1000);
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the format parameter is invalid', function (done) {
    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, process.env.API_PRIVATE_KEY);
    blockchainiz.postNotary(
      'wrongFormat',
      'Test string to notarize',
      function (err, data) {
        err.message.should.equal('ERROR: the format type is not provided or wrong');
        done();
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the data to notarize do not exist', function (done) {
    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, process.env.API_PRIVATE_KEY);
    blockchainiz.postNotary(
      'ascii',
      null,
      function (err, data) {
        err.message.should.equal('ERROR: the data to notarize should be provided as a string');
        done();
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the data to notarize is not a string', function (done) {
    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, process.env.API_PRIVATE_KEY);
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
  'use strict';

  // //////////////////////////////////////////////////////////////////////////

  it('should retrieve data that were just notarized', function (done) {
    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, process.env.API_PRIVATE_KEY);
    blockchainiz.getNotary(
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
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the format parameter is invalid', function (done) {
    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, process.env.API_PRIVATE_KEY);
    blockchainiz.getNotary(
      'wrongFormat',
      testTxid,
      function (err, data) {
        err.message.should.equal('ERROR: the format type is not provided or wrong');
        done();
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the txid parameter is null', function (done) {
    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, process.env.API_PRIVATE_KEY);
    blockchainiz.getNotary(
      'ascii',
      null,
      function (err, data) {
        err.message.should.equal('ERROR: the txid parameter should be present and a string');
        done();
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the format parameter is invalid', function (done) {
    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, process.env.API_PRIVATE_KEY);
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
  'use strict';

  // //////////////////////////////////////////////////////////////////////////

  it('should retrieve all data that were notarized with those keys', function (done) {
    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, process.env.API_PRIVATE_KEY);
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

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the format parameter is invalid', function (done) {
    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, process.env.API_PRIVATE_KEY);
    blockchainiz.getNotaries(
      'wrongFormat',
      function (err, data) {
        err.message.should.equal('ERROR: the format type is not provided or wrong');
        done();
      }
    );
  });
});
