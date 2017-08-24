import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SimpleCoreNLP from '../src';

global.expect = chai.expect;
global.sinon = sinon;
chai.use(sinonChai);

SimpleCoreNLP.setup(
  // new SimpleCoreNLP.ConnectorCli({
  //   classPath: '../nlp-node-workshop/corenlp/stanford-corenlp-full-2017-06-09/*'
  // })
  new SimpleCoreNLP.Connector({}),
);
