
const fs = require('fs');
const should = require('should');
const blockchainiz = require('../index.js');

// This block is used to get the environment variables necessary to perform 
// the tests. There needs to be a file called .env in the root folder of the
// project which contains:
// API_PUBLIC_KEY="yourPublicKey"
// API_PRIVATE_KEY="yourPrivateKey"
try {
  fs.accessSync('./.env');
  require('dotenv').config();
} catch (ex) {
  console.log(ex);
}

///////////////////////////////////////////////////////////////////////////////

describe('Keys verification related tests', function () {
  'use strict';

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the public key is null', function (done) {
    blockchainiz.setKeys(null, process.env.API_PRIVATE_KEY);
    blockchainiz.postNotary('ascii', 'something', function(err, data) {
      console.log(err);
      err.message.should.equal('ERROR: the public key is invalid or not provided');
      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the public key is not a string', function (done) {
    blockchainiz.setKeys(8796765653, process.env.API_PRIVATE_KEY);
    blockchainiz.postNotary('ascii', 'something', function(err, data) {
      console.log(err);
      err.message.should.equal('ERROR: the public key is invalid or not provided');
      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the public key does not have the correct lenght', function (done) {
    blockchainiz.setKeys('wrongKey', process.env.API_PRIVATE_KEY);
    blockchainiz.postNotary('ascii', 'something', function(err, data) {
      console.log(err);
      err.message.should.equal('ERROR: the public key is invalid or not provided');
      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the private key is null', function (done) {
    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, null);
    blockchainiz.postNotary('ascii', 'something', function(err, data) {
      console.log(err);
      err.message.should.equal('ERROR: the private key is invalid or not provided');
      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the private key is not a string', function (done) {
    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, 8756534453);
    blockchainiz.postNotary('ascii', 'something', function(err, data) {
      console.log(err);
      err.message.should.equal('ERROR: the private key is invalid or not provided');
      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because the private key does not have the correct lenght', function (done) {
    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, 'wrongKey');
    blockchainiz.postNotary('ascii', 'something', function(err, data) {
      console.log(err);
      err.message.should.equal('ERROR: the private key is invalid or not provided');
      done();
    });
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should fail because those keys are not valid on the prod version of the API', function (done) {
    blockchainiz.useSandbox(false);
    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, process.env.API_PRIVATE_KEY);
    blockchainiz.postNotary('ascii', 'something', function(err, data) {
      should.not.exist(err);
      console.log(data);
      done();
    });
    blockchainiz.useSandbox(true);
  });
});
