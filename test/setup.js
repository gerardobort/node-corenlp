import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import CoreNLP from '../src';

global.expect = chai.expect;
global.sinon = sinon;
chai.use(sinonChai);

CoreNLP.setup(
  null,
  // new CoreNLP.ConnectorCli({}),
  new CoreNLP.connector.ConnectorServer({}),
);
