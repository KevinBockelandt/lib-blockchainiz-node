const should = require('should');
const blockchainiz = require('../index.js');
// this is a smart contract already on blockchainiz 
// that contains everything needed for tests
const refContract = 327;
var eventReceived = false;

/// Tests /////////////////////////////////////////////////////////////////////

describe('Socket.io related tests', function () {
  'use strict';

  // //////////////////////////////////////////////////////////////////////////

  it('should be done when we get a new Ethereum block', function (done) {
    this.timeout(60000);

    blockchainiz.listenerNewBlockEthereum();

    blockchainiz.onNewBlockEthereum(function(hash) {
      if (!eventReceived) {
        hash.should.be.a.String();
        eventReceived = true;
        done();
      }
    });
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should call a function on a smart contract', function (done) {
    this.timeout(60000);

    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, process.env.API_PRIVATE_KEY);
    blockchainiz.listenerContract(refContract, 'TestEvent');
    blockchainiz.postContractEthereumSolidityFunction(
      [],
      refContract,
      'triggerTestEvent',
      function(err, data) {
        if (err) {
          console.log(err);
        }
        
        blockchainiz.onListenerContract(function (id, event, data) {
          id.should.equal(refContract);
          event.should.equal('TestEvent');
          data.someEventString.should.equal('This is a test string from the event');
          done();
        });
      }
    );
  });

  // //////////////////////////////////////////////////////////////////////////

  it('should return an error message from socketio', function (done) {
    this.timeout(10000);

    blockchainiz.setKeys(process.env.API_PUBLIC_KEY, process.env.API_PRIVATE_KEY);
    blockchainiz.onErrorText(function (event, error) {
      event.should.equal('listener_contract');
      error.should.equal('id not found');
      done();
    });
    blockchainiz.listenerContract(0, 'TestEvent');
  });

});
